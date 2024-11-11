import React from 'react';
import CaseCardsAdvocate from './CardLayoutAdvocate';
import homeDataAdvocate from './HomeAdvocate';
import NotificationCardAdvocate from './NotificationCardAdvocate';
import ProfileCompletionAdvocate from './ProfileCompletionChartAdvocate';

const HomeCardAdvocate: React.FC = () => {
  const handleNotificationClick = () => {
    console.log('Navigating to notifications...');
  };

  return (
    <div className="p-6 space-y-8 relative">
      {/* ProfileCompletion component positioned in the top-right corner */}
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <ProfileCompletionAdvocate />
      </div>

      {/* Render the CaseCards component and shift it upwards */}
      <div className="mt-8">
        {' '}
        {/* Adjust top margin to bring it closer to the top */}
        <CaseCardsAdvocate caseData={homeDataAdvocate} />
      </div>

      {/* Render the NotificationCard component */}
      <NotificationCardAdvocate onClick={handleNotificationClick} />
    </div>
  );
};

export default HomeCardAdvocate;
