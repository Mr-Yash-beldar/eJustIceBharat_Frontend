import React, { useState } from 'react';
import { toast } from 'react-toastify';
//@ts-ignore
import { CheckIcon, ClipboardIcon } from '@heroicons/react/outline';

interface MeetingDetailsScreenProps {
  onClickJoin: (meetingId: string) => void;
  _handleOnCreateMeeting: () => Promise<{ meetingId: string; err?: string }>;
  participantName: string;
  setParticipantName: React.Dispatch<React.SetStateAction<string>>;
  onClickStartMeeting: () => void;
  videoTrack?: MediaStreamTrack | null; // Add videoTrack as an optional prop
  setVideoTrack?: React.Dispatch<React.SetStateAction<MediaStreamTrack | null>>; // Add setVideoTrack as an optional prop
}

export const MeetingDetailsScreen: React.FC<MeetingDetailsScreenProps> = ({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  onClickStartMeeting,
  // videoTrack, // Destructure the videoTrack prop
  // setVideoTrack, // Destructure the setVideoTrack prop
}) => {
  const [meetingId, setMeetingId] = useState<string>('');
  const [meetingIdError, setMeetingIdError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCreateMeetingClicked, setIsCreateMeetingClicked] =
    useState<boolean>(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] =
    useState<boolean>(false);

  return (
    <div className="flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5">
      {isCreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3 flex items-center justify-center">
          <p className="text-white text-base">{`Meeting code : ${meetingId}`}</p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="Enter meeting Id"
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">
              Please enter a valid meetingId
            </p>
          )}
        </>
      ) : null}

      {(isCreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          <button
            disabled={participantName.length < 3}
            className={`w-full ${
              participantName.length < 3 ? 'bg-gray-650' : 'bg-purple-350'
            } text-white px-2 py-3 rounded-xl mt-5`}
            onClick={() => {
              if (isCreateMeetingClicked) {
                onClickStartMeeting();
              } else {
                if (meetingId.match('\\w{4}-\\w{4}-\\w{4}')) {
                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {isCreateMeetingClicked ? 'Start a meeting' : 'Join a meeting'}
          </button>
        </>
      )}

      {!isCreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full">
            <button
              className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
              onClick={async () => {
                const { meetingId, err } = await _handleOnCreateMeeting();

                if (meetingId) {
                  setMeetingId(meetingId);
                  setIsCreateMeetingClicked(true);
                } else {
                  toast(`${err}`, {
                    position: 'bottom-left',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                  });
                }
              }}
            >
              Create a meeting
            </button>
            <button
              className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-5"
              onClick={() => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join a meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
