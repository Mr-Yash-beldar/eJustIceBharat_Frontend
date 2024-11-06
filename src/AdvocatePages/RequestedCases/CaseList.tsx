import React, { useState } from 'react';
import cases from '../../pages/Cases/Cases';
import CaseCard from './CaseCard';
import CaseDetailsModal from './CaseDetailsModel';

interface Case {
  case_title: string;
  case_description: string;
  case_type: string;
  filing_date: string;
  causeOfAction: string;
  urgency_level: string;
  plaintiffName: string;
  plaintiffContactEmail: string;
  plaintiffContactPhone: string;
  plaintiffAddress: string;
  defendantName: string;
  defendantContactEmail: string;
  defendantContactPhone: string;
  defendantAddress: string;
  evidence_provided: string;
  witness_details: string;
  case_status: 'Filed' | 'Requested' | 'Accepted' | 'Registered' | 'Closed';
}

const CaseList: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [maxLimitMessage, setMaxLimitMessage] = useState('');
  const maxVisibleCount = cases.length;

  const handleViewMore = (caseData: Case) => {
    setSelectedCase(caseData);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {casesToDisplay.map((caseItem, index) => (
          <CaseCard
            key={index}
            caseData={caseItem}
            onViewMore={() => handleViewMore(caseItem)}
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

      {selectedCase && (
        <CaseDetailsModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
          onAccept={() => console.log('Case accepted:', selectedCase)}
          onReject={() => console.log('Case rejected:', selectedCase)}
        />
      )}
    </div>
  );
};

export default CaseList;
