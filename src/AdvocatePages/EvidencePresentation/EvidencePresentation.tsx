import React, { useState } from 'react';
import casesData from '../../pages/Cases/Cases';
import PDFViewer from './PdfViewer';
import pdfData from './pdfData';

const Evidence: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleViewPdf = () => {
    setSelectedPdf(pdfData[0].pdfUrl); // Display the same PDF for all cases
  };

  const handleClosePdf = () => {
    setSelectedPdf(null); // Clear the selected PDF to hide the viewer
  };

  return (
    <div className="relative">
      {/* Render PDFViewer component at the top with transparent overlay */}
      {selectedPdf && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
          style={{ top: '200px' }} // Increased the top offset
        >
          <PDFViewer pdfUrl={selectedPdf} onClose={handleClosePdf} />
        </div>
      )}

      <div className="overflow-x-auto z-10 relative">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Case Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                View PDF
              </th>
            </tr>
          </thead>
          <tbody>
            {casesData.map((caseData, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-700">
                  {caseData.case_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <button
                    onClick={handleViewPdf}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
                  >
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evidence;
