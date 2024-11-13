import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, onClose }) => {
  return (
    <div className="relative w-full max-w-3xl h-[750px] bg-white rounded-md shadow-lg overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-2.5 right-2.5 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer z-10 hover:bg-red-700"
      >
        Close
      </button>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
