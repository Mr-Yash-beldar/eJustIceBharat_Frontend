import React from 'react';
import { CardData } from './Home';
import Card from './Card';

const CaseCards: React.FC<{ caseData: CardData[] }> = ({ caseData }) => {
  const allCasesCard = caseData[0];
  const filedAndAcceptedCards = caseData.slice(1);

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

      {/* Remaining Cards - Grid Layout with 3 in Each Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filedAndAcceptedCards.map((card: CardData, index) => (
          <Card key={index} cardTitle={card.cardTitle} value={card.value} />
        ))}
      </div>
    </div>
  );
};

export default CaseCards;
