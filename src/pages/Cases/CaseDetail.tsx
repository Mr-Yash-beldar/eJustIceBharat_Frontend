// CaseDetailsModal.tsx
import React, { useState } from 'react';
import Notification from './Notification';
import EditCaseForm from './EditCaseForm';

interface CaseDetailsModalProps {
  caseData: {
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
}

const CaseDetailsModal: React.FC<CaseDetailsModalProps> = ({
  caseData,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleEditClick = () => {
    if (caseData.case_status === 'Filed') {
      setIsEditing(true);
      setNotification({
        message: 'You can now edit the case details.',
        type: 'success',
      });
    } else {
      setNotification({
        message: 'You cannot edit case details now.',
        type: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSave = (updatedData: any) => {
    // Save the updated data (handle save logic here)
    console.log('Updated Case Data:', updatedData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg"
        style={{
          maxHeight: '90vh',
          marginLeft: '30px',
          marginTop: '80px',
          overflowY: 'auto',
        }}
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {caseData.case_title}
        </h3>

        {/* Notification Display */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
          />
        )}

        <div className="max-h-[70vh] overflow-y-auto">
          {isEditing ? (
            <EditCaseForm
              caseData={caseData}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <p>
                <strong>Case Description:</strong> {caseData.case_description}
              </p>
              <p>
                <strong>Case Type:</strong> {caseData.case_type}
              </p>
              <p>
                <strong>Filing Date:</strong> {caseData.filing_date}
              </p>
              <p>
                <strong>Cause of Action:</strong> {caseData.causeOfAction}
              </p>
              <p>
                <strong>Urgency Level:</strong> {caseData.urgency_level}
              </p>

              <h4 className="mt-4 text-lg font-semibold">Plaintiff Details</h4>
              <p>
                <strong>Name:</strong> {caseData.plaintiffName}
              </p>
              <p>
                <strong>Contact Email:</strong> {caseData.plaintiffContactEmail}
              </p>
              <p>
                <strong>Contact Phone:</strong> {caseData.plaintiffContactPhone}
              </p>
              <p>
                <strong>Address:</strong> {caseData.plaintiffAddress}
              </p>

              <h4 className="mt-4 text-lg font-semibold">Defendant Details</h4>
              <p>
                <strong>Name:</strong> {caseData.defendantName}
              </p>
              <p>
                <strong>Contact Email:</strong> {caseData.defendantContactEmail}
              </p>
              <p>
                <strong>Contact Phone:</strong> {caseData.defendantContactPhone}
              </p>
              <p>
                <strong>Address:</strong> {caseData.defendantAddress}
              </p>

              <h4 className="mt-4 text-lg font-semibold">
                Additional Information
              </h4>
              <p>
                <strong>Evidence Provided:</strong> {caseData.evidence_provided}
              </p>
              <p>
                <strong>Witness Details:</strong> {caseData.witness_details}
              </p>
              <p>
                <strong>Case Status:</strong> {caseData.case_status}
              </p>
            </>
          )}
        </div>

        <div className="flex justify-end mt-4">
          {!isEditing && (
            <button
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              onClick={handleEditClick}
            >
              Edit Case Details
            </button>
          )}
          <button
            className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
