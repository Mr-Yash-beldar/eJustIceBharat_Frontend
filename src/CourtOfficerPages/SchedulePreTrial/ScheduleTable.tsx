// ScheduleTable.tsx
import React, { useState } from 'react';
import RequestedCases from '../RequestedCasesOfficer/RequestedCases';
import PreTrialScheduler from './PreTrialSchedular';

interface Case {
  case_title: string;
}

const ScheduleTable: React.FC = () => {
  const [showPreTrialScheduler, setShowPreTrialScheduler] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleJoinClick = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setShowPreTrialScheduler(true);
  };

  const handleScheduleConfirmation = (date: string, remarks: string) => {
    console.log(
      `Pre-trial scheduled for case "${selectedCase?.case_title}" on ${date} . Remarks: ${remarks}`,
    );
    setShowPreTrialScheduler(false);
  };

  return (
    <div className="p-4">
      {showPreTrialScheduler && selectedCase ? (
        <PreTrialScheduler
          caseTitle={selectedCase.case_title}
          onSchedule={handleScheduleConfirmation}
        />
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Case Title</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {RequestedCases.map((caseItem, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{caseItem.case_title}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleJoinClick(caseItem)}
                  >
                    Schedule Pretrial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleTable;
