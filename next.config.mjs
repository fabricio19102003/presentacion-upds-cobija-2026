/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      // jsPDF internally does import("html2canvas") — redirect to html2canvas-pro
      'html2canvas': 'html2canvas-pro',
      // Force browser bundle everywhere — node bundle uses fflate Workers that break SSR
      'jspdf': 'jspdf/dist/jspdf.es.min.js',
    },
  },
}

export default nextConfig
