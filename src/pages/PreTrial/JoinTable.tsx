// CaseTable.tsx
import React, { useState } from 'react';
import cases from '../Cases/Cases'; // Import your cases data
import PreTrialConferencingPage from './PreTrailConferencingPage'; // Import PreTrialConferencingPage component

const CaseTable: React.FC = () => {
  const [showPreTrialPage, setShowPreTrialPage] = useState(false);

  const handleJoinClick = () => {
    setShowPreTrialPage(true); // Show PreTrialConferencingPage
  };

  return (
    <div className="p-4">
      {showPreTrialPage ? (
        // Display PreTrialConferencingPage if showPreTrialPage is true
        <PreTrialConferencingPage />
      ) : (
        // Otherwise, display the case table
        <>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Case Title</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{caseItem.case_title}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleJoinClick}
                    >
                      Join Pretrial
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CaseTable;
