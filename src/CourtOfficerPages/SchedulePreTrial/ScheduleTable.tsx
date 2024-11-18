import React, { useEffect, useState } from 'react';
import { Case } from '../../pages/Cases/Cases';
import PreTrialScheduler from './PreTrialSchedular';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const transformCaseData = (data: any[]): Case[] => {
  return data.map((item) => ({
    id: item.caseId._id,
    case_title: item.caseId.case_title,
    case_description: item.caseId.case_description,
    case_type: item.caseId.case_type,
    filing_date: item.caseId.filing_date,
    causeOfAction: item.caseId.causeOfAction,
    urgency_level: item.caseId.urgency_level,
    plaintiffName: item.litigantId.litigant_name,
    plaintiffContactEmail: item.litigantId.litigant_email,
    plaintiffContactPhone: item.litigantId.litigant_mob,
    plaintiffAddress: item.litigantId.litigant_address,
    defendantName: item.caseId.defendantName,
    defendantContactEmail: item.caseId.defendantContactEmail,
    defendantContactPhone: item.caseId.defendantContactPhone,
    defendantAddress: item.caseId.defendantAddress,
    evidence_provided: item.caseId.evidence_provided,
    witness_details: item.caseId.witness_details,
    case_status: item.caseId.case_status,
    advocate_name: item.caseId.advocate_name || 'N/A',
    desired_hearing_date: item.caseId.desired_hearing_date || null,
    remark_for_case_by_advocate: item.caseId.remark_for_case_by_advocate || '',
  }));
};

const ScheduleTable: React.FC = () => {
  const token = localStorage.getItem('token');
  const [showPreTrialScheduler, setShowPreTrialScheduler] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [requestedCases, setRequestedCases] = useState<Case[]>([]);

  const handleJoinClick = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setShowPreTrialScheduler(true);
  };

  const handleScheduleConfirmation = async (date: string, remarks: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(
        `/request/schedule/${selectedCase?.id}`,
        { pretrialSchedule:date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
        const meetingResponse = await axiosInstance.post(
          '/ejusticeBharat/meeting/create-meeting'
        );
        const roomId=meetingResponse.data.roomId;

        const caseID=selectedCase?.id;
        const storedResponse=await axiosInstance.post(
          '/ejusticeBharat/meeting/store',{
            caseId:caseID,
            meetingCode:roomId
          }
        );

        toast.success(storedResponse.data.message);
      }
     catch (error) {
      toast.error(error.response.data.error);
    }
    setShowPreTrialScheduler(false);
  };

  const fetchCaseData = async () => {
    try {
      const response = await axiosInstance.get('/request/getAll', {
        params: { case_status: 'accepted' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const transformedData = transformCaseData(response.data);
      setRequestedCases(transformedData);
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

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
            {requestedCases.length > 0 ? (
              requestedCases.map((caseItem, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleTable;
