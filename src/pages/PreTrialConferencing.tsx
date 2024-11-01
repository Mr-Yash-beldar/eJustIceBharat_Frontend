import React, { useState, useEffect } from 'react';

const PreTrialConferencingPage: React.FC = () => {
  // State for scheduled pretrial
  const [scheduledDate] = useState(new Date('2024-11-02T00:55:00')); // Hardcoded future date
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
      setShowUpcomingCard(true); // Show upcoming card if current time is before 1:00 AM
      setShowCompletedCard(false);
    } else if (
      currentDate >= upcomingEndTime &&
      currentDate < completedEndTime
    ) {
      setShowUpcomingCard(false);
      setShowCompletedCard(true); // Show completed card for 5 hours after the scheduled time
    } else {
      setShowUpcomingCard(false);
      setShowCompletedCard(false); // Hide both cards if the scheduled time has passed and it's beyond 6:00 AM
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
      {/* Card for unscheduled pretrial */}
      {!showUpcomingCard && !showCompletedCard && (
        <div className="bg-gray-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
          <h2 className="text-3xl font-semibold">No Pretrial Scheduled</h2>
          <p className="mt-6 text-gray-700">
            Your pretrial has not been scheduled yet. Please check back later or
            contact your advocate for updates.
          </p>
        </div>
      )}

      {/* Card for upcoming pretrial */}
      {showUpcomingCard && (
        <div className="bg-blue-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
          <h2 className="text-3xl font-semibold">
            Upcoming Pretrial Scheduled
          </h2>
          <p className="mt-6 text-gray-700">
            Your pretrial is scheduled for{' '}
            <strong>
              {scheduledDate.toLocaleDateString('en-GB')} at{' '}
              {scheduledDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </strong>
            .
          </p>
          <div className="mt-6 flex flex-col">
            {/* Countdown for scheduled date */}
            {currentDate < scheduledDate ? (
              <p className="text-xl font-bold">
                Time until scheduled pretrial:{' '}
                {formatTimeRemaining(timeUntilScheduled)}
              </p>
            ) : (
              <p className="text-xl font-bold">
                Time until scheduled pretrial: 00d 00h 00m 00s
              </p>
            )}
            {/* Countdown for joining time */}
            <p className="text-xl font-bold">
              Time left to join pretrial: {formatTimeRemaining(timeUntilJoin)}
            </p>
            <button
              className={`mt-6 px-8 py-4 rounded text-white transition-colors duration-300 ${
                currentDate < scheduledDate
                  ? 'bg-green-500 hover:bg-green-600' // Darker when active
                  : 'bg-green-300 cursor-not-allowed' // Lighter when disabled
              }`}
              disabled={currentDate >= upcomingEndTime} // Button disabled if the time to join has passed
            >
              Join Pretrial
            </button>
          </div>
        </div>
      )}

      {/* Card for recent pretrial */}
      {showCompletedCard && (
        <div className="bg-yellow-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
          <h2 className="text-3xl font-semibold">Pretrial Completed</h2>
          <p className="mt-6 text-gray-700">
            The pretrial has recently taken place. If you have any questions,
            please contact your advocate.
          </p>
        </div>
      )}
    </div>
  );
};

export default PreTrialConferencingPage;
