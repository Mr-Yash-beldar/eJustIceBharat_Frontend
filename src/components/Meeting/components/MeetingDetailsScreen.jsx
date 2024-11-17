import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

export function MeetingDetailsScreen({
  onClickJoin,
  participantName,
  setParticipantName,
}) {
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);

    

  return (
    <div className="flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5">
      {/* Join Meeting Form */}
      <input
        value={meetingId} 
        onChange={(e) => {
          setMeetingId(e.target.value);
          setMeetingIdError(false); // Clear error on input change
        }}
        placeholder="Enter meeting ID"
        className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
      />
      {meetingIdError && (
        <p className="text-xs text-red-600">Please enter a valid meeting ID</p>
      )}
      
      <input
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        placeholder="Enter your name"
        className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-white w-full text-center"
      />

      <button
        disabled={participantName.length < 3}
        className={`w-full ${
          participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
        } text-white px-2 py-3 rounded-xl mt-5`}
        onClick={() => {
          if (meetingId.match("\\w{4}-\\w{4}-\\w{4}")) {
            onClickJoin(meetingId);
          } else {
            setMeetingIdError(true);
          }
        }}
      >
        Join a meeting
      </button>
    </div>
  );
}
