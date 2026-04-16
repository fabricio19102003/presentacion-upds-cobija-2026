import { useState, useCallback, RefObject } from 'react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface UseExportPDFOptions {
  fileName?: string;
  /** Refs to each task container — one per page */
  taskRefs: RefObject<(HTMLDivElement | null)[]>;
  /** Callback to switch the active tab before capturing */
  setActiveTab: (tab: number) => void;
  /** Total number of tasks */
  totalTasks: number;
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
      // A4 landscape for presentation-style slides
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < totalTasks; i++) {
        // Switch to the tab so the content renders
        setActiveTab(i + 1);

        // Wait for React to render + animations to settle
        await new Promise((resolve) => setTimeout(resolve, 800));

        const element = taskRefs.current?.[i];
        if (!element) continue;

        // Capture the rendered task
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#f8fafc', // slate-50 background
          logging: false,
          windowWidth: 1280,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate dimensions to fit A4 landscape with padding
        const padding = 8; // mm
        const availableWidth = pageWidth - padding * 2;
        const availableHeight = pageHeight - padding * 2;

        const ratio = Math.min(
          availableWidth / imgWidth,
          availableHeight / imgHeight,
        );

        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;

        // Center the image on the page
        const offsetX = (pageWidth - finalWidth) / 2;
        const offsetY = (pageHeight - finalHeight) / 2;

        if (i > 0) pdf.addPage();

        pdf.addImage(imgData, 'JPEG', offsetX, offsetY, finalWidth, finalHeight);

        setProgress(Math.round(((i + 1) / totalTasks) * 100));
      }

      pdf.save(fileName);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw error;
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  }, [fileName, taskRefs, setActiveTab, totalTasks]);

  return { exportPDF, isExporting, progress };
}
