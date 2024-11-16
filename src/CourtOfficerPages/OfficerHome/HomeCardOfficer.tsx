import React from 'react';
import CaseCardsOfficer from './CaseCardsOfficer';
import homeDataOfficer from './OfficerHome';

const HomeCardOfficer: React.FC = () => {
  return (
    <div className="p-6 space-y-8 relative">
      {/* Render the CaseCards component and shift it upwards */}
      <div className="mt-8">
        {' '}
        {/* Adjust top margin to bring it closer to the top */}
        <CaseCardsOfficer caseData={homeDataOfficer} />
      </div>

      {/* Render the NotificationCard component */}
    </div>
  );
};

export default HomeCardOfficer;
