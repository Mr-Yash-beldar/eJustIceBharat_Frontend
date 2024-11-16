import React, { useState, useEffect } from 'react';

interface PreTrialSchedulerProps {
  caseTitle: string;
  onSchedule: (date: string, remarks: string) => void;
}

const PreTrialScheduler: React.FC<PreTrialSchedulerProps> = ({
  caseTitle,
  onSchedule,
}) => {
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onSchedule(date, remarks);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">
        Schedule Pretrial for "{caseTitle}"
      </h2>
      {isLoading && (
        <div className="border-2 border-red-500 bg-red-50 text-red-600 rounded p-3 mb-4">
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Scheduling...
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Remarks
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`${
            isLoading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'
          } text-white font-bold py-2 px-4 rounded`}
          disabled={isLoading}
        >
          {isLoading ? 'Scheduling...' : 'Schedule'}
        </button>
      </form>
    </div>
  );
};

export default PreTrialScheduler;
