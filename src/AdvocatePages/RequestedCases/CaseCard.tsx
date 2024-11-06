import React from 'react';

interface CaseCardProps {
  caseData: {
    case_title: string;
    case_type: string;
    filing_date: string;
    plaintiffName: string;
  };
  onViewMore: () => void; // Add the onViewMore prop here
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, onViewMore }) => {
  const { case_title, case_type, filing_date, plaintiffName } = caseData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{case_title}</h2>
        <p className="text-gray-500 text-sm">Filed on: {filing_date}</p>
      </div>
      
      <p className="text-gray-600 text-sm">Case Type: {case_type}</p>
      <p className="text-gray-600 text-sm">Plaintiff: {plaintiffName}</p>

      <button
        onClick={onViewMore} // Trigger onViewMore when clicked
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        View More
      </button>
    </div>
  );
};

export default CaseCard;
