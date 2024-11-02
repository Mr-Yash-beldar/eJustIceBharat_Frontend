import React from 'react';
import CaseCards from './CardLayout';
import homeData from './Home';
import NotificationCard from './NotificationCard';
import ProfileCompletion from './ProfileCompletionChart';

const HomeCard: React.FC = () => {
  const handleNotificationClick = () => {
    console.log('Navigating to notifications...');
  };

  return (
    <div className="p-6 space-y-8 relative">
      {/* ProfileCompletion component positioned in the top-right corner */}
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <ProfileCompletion />
      </div>

      {/* Render the CaseCards component and shift it upwards */}
      <div className="mt-8">
        {' '}
        {/* Adjust top margin to bring it closer to the top */}
        <CaseCards caseData={homeData} />
      </div>

      {/* Render the NotificationCard component */}
      <NotificationCard onClick={handleNotificationClick} />
    </div>
  );
};

export default HomeCard;
