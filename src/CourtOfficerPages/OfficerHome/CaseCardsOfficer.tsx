import React from 'react';
import { CardDataOfficer } from './OfficerHome';

const CaseCardsOfficer: React.FC<{ caseData: CardDataOfficer[] }> = ({
  caseData,
}) => {
  const allCasesCard = caseData[0];
  const AcceptedCards = caseData.slice(1, 3); // Take only two cards after the first one

  return (
    <div className="p-4">
      {/* Centered All Cases Card - Positioned higher */}
      <div className="flex justify-center mb-4">
        <div className="mx-2">
          <div className="h-48 w-72 md:h-56 md:w-80 lg:h-60 lg:w-88 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4 text-center">
            <div className="text-lg font-semibold mb-2">
              {allCasesCard.cardTitle}
            </div>
            <div className="text-2xl font-bold">{allCasesCard.value}</div>
          </div>
        </div>
      </div>

      {/* Two Remaining Cards - Same Size as Top Card */}
      <div className="flex justify-center gap-6">
        {AcceptedCards.map((card: CardDataOfficer, index) => (
          <div key={index} className="mx-2">
            <div className="h-48 w-72 md:h-56 md:w-80 lg:h-60 lg:w-88 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4 text-center">
              <div className="text-lg font-semibold mb-2">{card.cardTitle}</div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseCardsOfficer;
