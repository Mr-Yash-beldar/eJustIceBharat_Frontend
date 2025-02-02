import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import App from '../../components/Meeting/App';
import { ClipboardCopy } from "lucide-react";
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
      setMeetingCode(response.data.meetingCode);
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


  const [copied, setCopied] = useState(false);

  // Copy to Clipboard Function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5 sec
  };

  return (
    <div className="bg-blue-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
      <h2 className="text-3xl font-semibold">Upcoming Pretrial Scheduled</h2>

      {/* Pretrial Code with Copy Icon */}
      <div className="flex items-center justify-center gap-x-2 mt-6">
        <h4 className="text-4xl font-bold">{meetingCode}</h4>
        <div className="relative">
          <ClipboardCopy 
            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900 active:scale-90 transition"
            onClick={copyToClipboard} 
          />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* Pretrial Schedule Info */}
      <p className="mt-6 text-gray-700">
        Your pretrial is scheduled for{' '}
        <strong>
          {scheduledDate.toLocaleDateString('en-GB')} at{' '}
          {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </strong>.
      </p>

      {/* Countdown Timers */}
      <div className="mt-6 flex flex-col">
        <p className="text-xl font-bold">
          Time until scheduled pretrial: {currentDate < scheduledDate ? formatTimeRemaining(timeUntilScheduled) : "00d 00h 00m 00s"}
        </p>
        <p className="text-xl font-bold">
          Time left to join pretrial: {formatTimeRemaining(timeUntilJoin)}
        </p>

        {/* Join Button */}
        <button
          className={`mt-6 px-8 py-4 rounded text-white font-semibold transition-all duration-300 ${
            isJoinButtonEnabled
              ? 'bg-green-500 hover:bg-green-600 active:scale-95' // Active state
              : 'bg-green-300 cursor-not-allowed opacity-60' // Disabled state
          }`}
          disabled={!isJoinButtonEnabled}
          onClick={handleJoinMeeting}
        >
          Join Pretrial
        </button>
      </div>
    </div>
  );
};

export default UpcomingPretrialCard;
