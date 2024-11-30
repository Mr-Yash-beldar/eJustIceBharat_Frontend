import React, { useEffect, useState } from 'react';
import { Case } from '../Cases/Cases'; // Import your cases data
import PreTrialConferencingPage from './PreTrailConferencingPage'; // Import PreTrialConferencingPage component
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthProvider';

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
  }));
};

const CaseTable: React.FC = () => {
  const [showPreTrialPage, setShowPreTrialPage] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedCaseName, setSelectedCaseName] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const {role}=useAuth();

  const token = localStorage.getItem('token');
  const url=role==='litigant'?'getAllpre':'getAll';

  const fetchCaseData = async () => {
    try {
      const response = await axiosInstance.get(`/request/${url}`, {
        params: { case_status: 'scheduled' }, // Pass filter via query params
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
        withCredentials: true, // Ensure credentials are sent if required
      });
      const transformedData = transformCaseData(response.data); // Transform the data
      setCases(transformedData); // Update the state with transformed data
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };

  // Use effect to fetch data when the component mounts
  useEffect(() => {
    fetchCaseData();
  }, []);

  const handleJoinClick = (caseId: string, caseName:string) => {
    setSelectedCaseId(caseId); // Store the selected caseId
    setSelectedCaseName(caseName); // Store the selected caseName
    setShowPreTrialPage(true); // Show PreTrialConferencingPage
  };

  return (
    <div className="p-4">
      {showPreTrialPage && selectedCaseId ? (
        // Display PreTrialConferencingPage if showPreTrialPage is true
        <PreTrialConferencingPage CaseID={selectedCaseId} CaseName={selectedCaseName} />
      ) : (
        // Otherwise, display the case table
        <>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Case Title</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{caseItem.case_title}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleJoinClick(caseItem.id,caseItem.case_title)} // Pass the caseItem.id
                    >
                      Join Pretrial
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CaseTable;
