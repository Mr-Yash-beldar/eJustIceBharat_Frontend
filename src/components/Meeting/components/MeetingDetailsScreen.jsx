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
    <div className="flex flex-1 flex-col justify-center w-full md:p-6 sm:p-4 p-3 bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          Join a Meeting
        </h2>

        {/* Join Meeting Form */}
        <input
          value={meetingId}
          onChange={(e) => {
            setMeetingId(e.target.value);
            setMeetingIdError(false); // Clear error on input change
          }}
          placeholder="Enter meeting ID"
          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-gray-200 w-full text-center placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />
        {meetingIdError && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
            Please enter a valid meeting ID
          </p>
        )}

        <input
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Enter your name"
          className="px-4 py-3 mt-5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-gray-200 w-full text-center placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        />

        <button
          className={`w-full px-4 py-3 rounded-xl mt-6 shadow-md ${
            participantName.length >= 3 &&
            meetingId.match("\\w{4}-\\w{4}-\\w{4}")
              ? "bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => {
            if (meetingId.match("\\w{4}-\\w{4}-\\w{4}")) {
              onClickJoin(meetingId);
            } else {
              setMeetingIdError(true);
            }
          }}
          disabled={
            !(
              participantName.length >= 3 &&
              meetingId.match("\\w{4}-\\w{4}-\\w{4}")
            )
          }
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
}
