import React from 'react';

interface CaseCardProps {
  caseData: {
    case_title: string;
  };
  payFees: () => void; // Add the onViewMore prop here
}

const CaseCardFee: React.FC<CaseCardProps> = ({ caseData, payFees }) => {
  const { case_title } = caseData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{case_title}</h2>
      </div>

      <button
        onClick={payFees} // Trigger onViewMore when clicked
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Pay Fees
      </button>
    </div>
  );
};

export default CaseCardFee;
