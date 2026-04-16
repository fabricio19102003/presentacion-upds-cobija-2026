import { useState, useCallback, RefObject } from 'react';
import { toast } from 'sonner';

interface UseExportPDFOptions {
  fileName?: string;
  taskRefs: RefObject<(HTMLDivElement | null)[]>;
  setActiveTab: (tab: number) => void;
  totalTasks: number;
}

/**
 * Loads jsPDF and html2canvas-pro at runtime only (browser).
 */
async function loadPDFLibs() {
  const [html2canvasModule, jspdfModule] = await Promise.all([
    import('html2canvas-pro'),
    import('jspdf'),
  ]);

  return {
    html2canvas: html2canvasModule.default,
    jsPDF: jspdfModule.jsPDF,
  };
}

/**
 * Polls until the element ref exists and has non-zero dimensions.
 * This is needed because React conditional rendering + Recharts ResponsiveContainer
 * need real time to mount and compute layout.
 */
function waitForElement(
  taskRefs: RefObject<(HTMLDivElement | null)[]>,
  index: number,
  timeoutMs = 10000,
): Promise<HTMLDivElement> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      const el = taskRefs.current?.[index];
      if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
        resolve(el);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timeout esperando la sección ${index + 1}. Intentá de nuevo.`));
        return;
      }
      requestAnimationFrame(check);
    };

    check();
  });
}

/**
 * Waits until all <img> elements inside the given element are fully loaded.
 * Includes a safety timeout to prevent hanging forever.
 */
function waitForImages(element: HTMLElement, timeoutMs = 10000): Promise<void> {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => resolve(), timeoutMs);

    const images = Array.from(element.querySelectorAll<HTMLImageElement>('img'));
    const pending = images.filter((img) => !img.complete);

    if (pending.length === 0) {
      clearTimeout(timer);
      resolve();
      return;
    }

    let settled = 0;
    const onSettle = () => {
      settled += 1;
      if (settled >= pending.length) {
        clearTimeout(timer);
        resolve();
      }
    };

    for (const img of pending) {
      img.addEventListener('load', onSettle, { once: true });
      img.addEventListener('error', onSettle, { once: true });
    }
  });
}

export function useExportPDF({
  fileName = 'UPDS_Presentacion_Estrategica_2026.pdf',
  taskRefs,
  setActiveTab,
  totalTasks,
}: UseExportPDFOptions) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const exportPDF = useCallback(async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      const { html2canvas, jsPDF } = await loadPDFLibs();

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Disable CSS animations and unlock scroll containers for full-content capture
      const styleEl = document.createElement('style');
      styleEl.id = 'pdf-export-overrides';
      styleEl.textContent = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        .recharts-bar-rectangle {
          transition: none !important;
        }
      `;
      document.head.appendChild(styleEl);

      // Unlock the <main> scroll container so html2canvas captures full content
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.style.height = 'auto';
        mainEl.style.overflow = 'visible';
      }

      for (let i = 0; i < totalTasks; i++) {
        // Switch tab — triggers React to mount the component
        setActiveTab(i + 1);

        // Poll until the element is mounted AND has real dimensions
        const element = await waitForElement(taskRefs, i);

        // Wait for images inside this section
        await waitForImages(element);

        // Extra settle time for Recharts charts to finish rendering
        await new Promise((r) => setTimeout(r, 500));

        // Capture the actual computed width before html2canvas clones the element
        const elementWidth = element.offsetWidth;

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#f8fafc',
            logging: false,
            width: elementWidth,
            windowWidth: elementWidth,
            scrollX: 0,
            scrollY: 0,
          });
        } catch (captureError) {
          console.error(`Error capturing section ${i + 1}:`, captureError);
          throw new Error(
            `No se pudo capturar la sección ${i + 1}. Verificá que las imágenes sean accesibles.`
          );
        }

        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error(
            `La sección ${i + 1} no tiene contenido visible (${canvas.width}x${canvas.height}). Intentá de nuevo.`
          );
        }

        // Calculate dimensions to fit A4 landscape
        const canvasAspect = canvas.width / canvas.height;
        const padding = 8; // mm
        const availableWidth = pageWidth - padding * 2;
        const availableHeight = pageHeight - padding * 2;

        let imgW: number;
        let imgH: number;

        if (canvasAspect > availableWidth / availableHeight) {
          imgW = availableWidth;
          imgH = availableWidth / canvasAspect;
        } else {
          imgH = availableHeight;
          imgW = availableHeight * canvasAspect;
        }

        const imgX = (pageWidth - imgW) / 2;
        const imgY = (pageHeight - imgH) / 2;

        if (i > 0) pdf.addPage();

        pdf.addImage({
          imageData: canvas,
          format: 'JPEG',
          x: imgX,
          y: imgY,
          width: imgW,
          height: imgH,
          compression: 'MEDIUM',
        });

        setProgress(Math.round(((i + 1) / totalTasks) * 100));
      }

      pdf.save(fileName);
      toast.success('PDF exportado correctamente');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al exportar el PDF';
      console.error('Error exporting PDF:', error);
      toast.error(message);
      throw error;
    } finally {
      // Restore <main> scroll container
      const mainRestore = document.querySelector('main');
      if (mainRestore) {
        mainRestore.style.height = '';
        mainRestore.style.overflow = '';
      }
      document.getElementById('pdf-export-overrides')?.remove();
      setIsExporting(false);
      setProgress(0);
    }
  }, [fileName, taskRefs, setActiveTab, totalTasks]);

  return { exportPDF, isExporting, progress };
}
