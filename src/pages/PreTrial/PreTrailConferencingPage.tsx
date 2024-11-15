import React, { useState, useEffect } from 'react';
import NoPretrialCard from './NoPretrialCard';
import UpcomingPretrialCard from './UpcomingPretrialCard';
import CompletedPretrialCard from './CompletedPretrialCard';

const PreTrialConferencingPage: React.FC = () => {
  const [scheduledDate] = useState(new Date('2024-11-13T13:34:00')); // Hardcoded future date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showUpcomingCard, setShowUpcomingCard] = useState(false);
  const [showCompletedCard, setShowCompletedCard] = useState(false);

  // Update the current date every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEndTime = new Date(scheduledDate.getTime() + 15 * 60 * 1000); // 15 minutes after the scheduled date
  const completedEndTime = new Date(
    scheduledDate.getTime() + 6 * 60 * 60 * 1000,
  ); // 5 hours after scheduled date

  useEffect(() => {
    if (currentDate < upcomingEndTime) {
      setShowUpcomingCard(true);
      setShowCompletedCard(false);
    } else if (
      currentDate >= upcomingEndTime &&
      currentDate < completedEndTime
    ) {
      setShowUpcomingCard(false);
      setShowCompletedCard(true);
    } else {
      setShowUpcomingCard(false);
      setShowCompletedCard(false);
    }
  }, [currentDate, upcomingEndTime, completedEndTime]);

  // Calculate remaining time until scheduled date
  const timeUntilScheduled = scheduledDate.getTime() - currentDate.getTime();
  const timeUntilJoin = upcomingEndTime.getTime() - currentDate.getTime();

  // Function to format time remaining
  const formatTimeRemaining = (time: number): string => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      {!showUpcomingCard && !showCompletedCard && <NoPretrialCard />}
      {showUpcomingCard && (
        <UpcomingPretrialCard
          scheduledDate={scheduledDate}
          currentDate={currentDate}
          timeUntilScheduled={timeUntilScheduled}
          timeUntilJoin={timeUntilJoin}
          formatTimeRemaining={formatTimeRemaining}
        />
      )}
      {showCompletedCard && <CompletedPretrialCard />}
    </div>
  );
};

export default PreTrialConferencingPage;
