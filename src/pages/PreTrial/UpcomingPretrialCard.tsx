import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import App from '../../components/Meeting/App';
import axiosInstance from '../../utils/axiosInstance';

interface UpcomingPretrialCardProps {
  scheduledDate: Date;
  currentDate: Date;
  timeUntilScheduled: number;
  timeUntilJoin: number;
  CaseID: string;
  formatTimeRemaining: (time: number) => string;
}

const UpcomingPretrialCard: React.FC<UpcomingPretrialCardProps> = ({
  CaseID,
  scheduledDate,
  currentDate,
  timeUntilScheduled,
  timeUntilJoin,
  formatTimeRemaining,
}) => {
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  
  const fetchCaseData = async () => {
    try {
      const response = await axiosInstance.post('/ejusticeBharat/meeting/get-meeting-code', {
        caseId: CaseID,
      });
      setMeetingCode(response.data.pretrialSchedule);
    } catch (error) {
      console.error('Error fetching case data:', error);
      setMeetingCode(''); // Fallback date
    }
  };

  // Fetch data only once when component mounts
  useEffect(() => {
    fetchCaseData();
  }, [CaseID]);

  // Determine if the button should be enabled
  const isJoinButtonEnabled =
    currentDate >= scheduledDate &&
    currentDate <= new Date(scheduledDate.getTime() + 15 * 60 * 1000);

  const handleJoinMeeting = () => {
    if (isJoinButtonEnabled) {
      setMeetingStarted(true); // Trigger meeting start
    }
  };

  if (meetingStarted) {
    // Render the imported Meeting component if the meeting has started
        // Navigate to the route with the meeting code
        navigate('/dashboard/meeting', { state: { meetingCode } });
  }

  // Default rendering for UpcomingPretrialCard
  return (
    <div className="bg-blue-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
      <h2 className="text-3xl font-semibold">Upcoming Pretrial Scheduled</h2>
      <p className="mt-6 text-gray-700">
        Your pretrial is scheduled for{' '}
        <strong>
          {scheduledDate.toLocaleDateString('en-GB')} at{' '}
          {scheduledDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </strong>.
      </p>
      <div className="mt-6 flex flex-col">
        {currentDate < scheduledDate ? (
          <p className="text-xl font-bold">
            Time until scheduled pretrial: {formatTimeRemaining(timeUntilScheduled)}
          </p>
        ) : (
          <p className="text-xl font-bold">
            Time until scheduled pretrial: 00d 00h 00m 00s
          </p>
        )}
        <p className="text-xl font-bold">
          Time left to join pretrial: {formatTimeRemaining(timeUntilJoin)}
        </p>
        <button
          className={`mt-6 px-8 py-4 rounded text-white transition-colors duration-300 ${
            isJoinButtonEnabled
              ? 'bg-green-500 hover:bg-green-600' // Active button style
              : 'bg-green-300 cursor-not-allowed' // Disabled button style
          }`}
          disabled={!isJoinButtonEnabled} // Button is disabled if not within the 15-min window
          onClick={handleJoinMeeting} // Handle button click
        >
          Join Pretrial
        </button>
      </div>
    </div>
  );
};

export default UpcomingPretrialCard;
