import React, { useState, useEffect } from 'react';
import NoPretrialCard from './NoPretrialCard';
import UpcomingPretrialCard from './UpcomingPretrialCard';
import CompletedPretrialCard from './CompletedPretrialCard';
import axiosInstance from '../../utils/axiosInstance';

interface PreTrialConferencingPageProps {
  CaseID: string; // Add caseId as a prop
  CaseName: string;
}

const PreTrialConferencingPage: React.FC<PreTrialConferencingPageProps> = ({ CaseID,CaseName }) => {
  const [meetingDate, setMeetingDate] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showUpcomingCard, setShowUpcomingCard] = useState(false);
  const [showCompletedCard, setShowCompletedCard] = useState(false);

  const fetchCaseData = async () => {
    try {
      const response = await axiosInstance.post('/request/getDate', {
        caseId: CaseID,
      });
      setMeetingDate(response.data.pretrialSchedule);
    } catch (error) {
      console.error('Error fetching case data:', error);
      setMeetingDate('2024-11-17T09:34:00'); // Fallback date
    }
  };

  // Fetch data only once when component mounts
  useEffect(() => {
    fetchCaseData();
  }, [CaseID]);

  // Update scheduledDate whenever meetingDate changes
  useEffect(() => {
    if (meetingDate) {
      setScheduledDate(new Date(meetingDate));
    }
  }, [meetingDate]);

  // Update the current date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!scheduledDate) return;

    const upcomingEndTime = new Date(scheduledDate.getTime() + 15 * 60 * 1000); // 15 minutes after scheduled date
    const completedEndTime = new Date(scheduledDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours after scheduled date

    if (currentDate < upcomingEndTime) {
      setShowUpcomingCard(true);
      setShowCompletedCard(false);
    } else if (currentDate >= upcomingEndTime && currentDate < completedEndTime) {
      setShowUpcomingCard(false);
      setShowCompletedCard(true);
    } else {
      setShowUpcomingCard(false);
      setShowCompletedCard(false);
    }
  }, [currentDate, scheduledDate]);

  const timeUntilScheduled = scheduledDate ? scheduledDate.getTime() - currentDate.getTime() : 0;
  const timeUntilJoin = scheduledDate ? scheduledDate.getTime() + 15 * 60 * 1000 - currentDate.getTime() : 0;

  const formatTimeRemaining = (time: number): string => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h1 className="text-xl font-bold">Case : {CaseName}</h1>
      {!scheduledDate ? (
        <p>Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default PreTrialConferencingPage;
