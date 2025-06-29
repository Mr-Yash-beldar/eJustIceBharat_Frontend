import React from 'react';
import axiosInstance from '../../utils/axiosInstance';

interface CaseDetailsProps {
  caseData: {
    id: string;
    case_title: string;
    case_description: string;
    case_type: string;
    filing_date: string;
    causeOfAction: string;
    urgency_level: string;
    plaintiffName: string;
    plaintiffContactEmail: string;
    plaintiffContactPhone: string;
    plaintiffAddress: string;
    defendantName: string;
    defendantContactEmail: string;
    defendantContactPhone: string;
    defendantAddress: string;
    evidence_provided: string;
    witness_details: string;
    case_status: string;
  };
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const CaseDetailsModal: React.FC<CaseDetailsProps> = ({
  caseData,
  onClose,
  onAccept,
  onReject,
}) => 
  {;

    const updateCaseStatus = async (caseId: string, status: string) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`cases/updateStatus/${caseId}`, {
          case_status: status,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating case status:", error);
        throw error;
      }
    };
    
    const handleAccept = async () => {
      try {
        await updateCaseStatus(caseData.id, "accepted");
        onAccept(); // Optionally update the UI state or trigger parent component refresh
      } catch (error) {
        console.error("Failed to update case status to Accepted");
      }
    };

    const formatDateToYYYYMMDD = (input:any) => {
      //convert date to YYYY-MM-DD convert it to string
      if (input === undefined) {
        return '';
      }
      return input.split('T')[0];
    };

    

  return (
    <div
      className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50"
      style={{ paddingTop: '100px' }}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative"
        style={{
          backgroundColor: '#e0f7fa',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {caseData.case_title}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-900 text-2xl transition-colors duration-200"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="text-gray-600">
          <p className="text-lg">
            <strong>Description:</strong> {caseData.case_description}
          </p>
          <p className="text-lg">
            <strong>Case Type:</strong> {caseData.case_type}
          </p>
          <p className="text-lg">
            <strong>Filing Date:</strong> {formatDateToYYYYMMDD(caseData.filing_date)}
          </p>
          <p className="text-lg">
            <strong>Urgency Level:</strong> {caseData.urgency_level}
          </p>

          <p className="mt-4 text-blue-600 font-medium">
            Plaintiff Information
          </p>
          <p className="text-lg">
            <strong>Name:</strong> {caseData.plaintiffName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {caseData.plaintiffContactEmail}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {caseData.plaintiffContactPhone}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {caseData.plaintiffAddress}
          </p>

          <p className="mt-4 text-blue-600 font-medium">
            Defendant Information
          </p>
          <p className="text-lg">
            <strong>Name:</strong> {caseData.defendantName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {caseData.defendantContactEmail}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {caseData.defendantContactPhone}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {caseData.defendantAddress}
          </p>
          <p className="mt-4 text-blue-600 font-medium">
            Additional Information
          </p>
          <p className="mt-4 text-lg">
            <strong>Evidence Provided:</strong> {caseData.evidence_provided}
          </p>
          <p className="text-lg">
            <strong>Witness Details:</strong> {caseData.witness_details}
          </p>
          <p className="text-lg">
            <strong>Status:</strong> {caseData.case_status}
          </p>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleAccept}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
          >
            Accept Case
          </button>
          <button
            onClick={onReject}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
          >
            Reject Case
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
