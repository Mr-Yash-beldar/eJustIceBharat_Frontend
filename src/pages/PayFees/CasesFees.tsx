import React, { useState } from 'react';
import cases from '../../pages/Cases/Cases';
import CaseCardFee from './CaseCardFees';
import PayFees from './PayFees';

interface Case {
  case_title: string;
}

const CaseFee: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [maxLimitMessage, setMaxLimitMessage] = useState('');
  const maxVisibleCount = cases.length;

  const handlePayFees = (caseData: Case) => {
    setSelectedCase(caseData); // Set selected case to show PayFees
  };

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 6;
    setVisibleCount(newVisibleCount);

    if (newVisibleCount >= maxVisibleCount) {
      setMaxLimitMessage('All cases have been displayed.');
    }
  };

  const casesToDisplay = cases.slice(0, visibleCount);
  const currentPage = Math.ceil(visibleCount / 6);

  return (
    <div className="p-6">
      {selectedCase ? (
        // Render PayFees component if a case is selected
        <PayFees caseTitle={selectedCase.case_title} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {casesToDisplay.map((caseItem, index) => (
              <CaseCardFee
                key={index}
                caseData={caseItem}
                payFees={() => handlePayFees(caseItem)}
              />
            ))}
          </div>

          {visibleCount < maxVisibleCount && (
            <div className="text-center my-6">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}

          {maxLimitMessage && (
            <div className="text-red-500 text-center">{maxLimitMessage}</div>
          )}

          <div className="text-center mt-4">
            <span>
              Page {currentPage} of {Math.ceil(maxVisibleCount / 6)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CaseFee;
