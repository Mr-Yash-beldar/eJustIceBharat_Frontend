import React, { useState } from 'react';
import casesData from '../../pages/Cases/Cases';
import Notification from '../../pages/Cases/Notification';
import CaseDetailsModalAdvocate from './CaseDetailAdvocate';
import ChargeFeeForm from './ChargeFeeForm';
import { jsPDF } from 'jspdf';

const ViewCasesAdvocate: React.FC = () => {
  const [caseData, setCaseData] = useState(casesData);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>(
    'success',
  );
  const [selectedCase, setSelectedCase] = useState<
    (typeof casesData)[0] | null
  >(null);
  const [chargeFeeCase, setChargeFeeCase] = useState<
    (typeof casesData)[0] | null
  >(null);

  const handleView = (caseItem: (typeof casesData)[0]) => {
    setSelectedCase(caseItem);
  };

  const handleDownload = (caseItem: (typeof casesData)[0]) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Case Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Case Title: ${caseItem.case_title}`, 10, 20);
    doc.text(`Case Description: ${caseItem.case_description}`, 10, 30);
    doc.text(`Case Type: ${caseItem.case_type}`, 10, 40);
    doc.text(`Filing Date: ${caseItem.filing_date}`, 10, 50);
    doc.text(`Cause of Action: ${caseItem.causeOfAction}`, 10, 60);
    doc.text(`Urgency Level: ${caseItem.urgency_level}`, 10, 70);
    doc.setFontSize(14);
    doc.text('Plaintiff Details:', 10, 80);
    doc.setFontSize(12);
    doc.text(`Name: ${caseItem.plaintiffName}`, 10, 90);
    doc.text(`Contact Email: ${caseItem.plaintiffContactEmail}`, 10, 100);
    doc.text(`Contact Phone: ${caseItem.plaintiffContactPhone}`, 10, 110);
    doc.text(`Address: ${caseItem.plaintiffAddress}`, 10, 120);
    doc.setFontSize(14);
    doc.text('Defendant Details:', 10, 130);
    doc.setFontSize(12);
    doc.text(`Name: ${caseItem.defendantName}`, 10, 140);
    doc.text(`Contact Email: ${caseItem.defendantContactEmail}`, 10, 150);
    doc.text(`Contact Phone: ${caseItem.defendantContactPhone}`, 10, 160);
    doc.text(`Address: ${caseItem.defendantAddress}`, 10, 170);
    doc.setFontSize(14);
    doc.text('Additional Information:', 10, 180);
    doc.setFontSize(12);
    doc.text(`Evidence Provided: ${caseItem.evidence_provided}`, 10, 190);
    doc.text(`Witness Details: ${caseItem.witness_details}`, 10, 200);
    doc.text(`Case Status: ${caseItem.case_status}`, 10, 210);
    doc.save(`${caseItem.case_title}_details.pdf`);
  };

  const handleChargeFeeIconClick = (caseItem: (typeof casesData)[0]) => {
    setChargeFeeCase(caseItem);
  };

  const handleFeeChargeSubmit = (amount: number) => {
    console.log(
      `Fee charged for case "${chargeFeeCase?.case_title}": $${amount}`,
    );
    setFeedbackMessage(
      `Amount of $${amount} charged successfully for case: ${chargeFeeCase?.case_title}`,
    );
    setMessageType('success');
    setChargeFeeCase(null);
  };

  const handleCloseNotification = () => {
    setFeedbackMessage('');
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-2xl font-bold mb-4">My Cases</h2>
      {feedbackMessage && (
        <div className="w-full flex justify-end mb-2">
          <Notification
            message={feedbackMessage}
            type={messageType}
            onClose={handleCloseNotification}
          />
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Case Title
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Case Type
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {caseData.map((caseItem, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-6 text-sm text-gray-700">
                  {caseItem.case_title}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {caseItem.case_type}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caseItem.case_status === 'Closed'
                        ? 'bg-red-100 text-red-600'
                        : caseItem.case_status === 'Requested'
                        ? 'bg-yellow-100 text-yellow-600'
                        : caseItem.case_status === 'Accepted'
                        ? 'bg-green-100 text-green-600'
                        : caseItem.case_status === 'Registered'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {caseItem.case_status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => handleView(caseItem)}
                    >
                      {/* View Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S13.38 9.5 12 9.5z" />
                      </svg>
                    </button>
                    <button
                      className="text-gray-600 hover:text-green-600"
                      onClick={() => handleDownload(caseItem)}
                    >
                      {/* Download Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 16l-6-6h4V4h4v6h4l-6 6zM5 18h14v2H5z" />
                      </svg>
                    </button>
                    <button
                      className="text-gray-600 hover:text-purple-600"
                      onClick={() => handleChargeFeeIconClick(caseItem)}
                    >
                      {/* Charge Fee Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-6H6v2h12v-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <CaseDetailsModalAdvocate
          caseData={selectedCase}
          onClose={handleCloseModal}
        />
      )}

      {chargeFeeCase && (
        <div className="fixed inset-0 bg-opacity-30 bg-black z-50 flex items-center justify-center">
          <ChargeFeeForm
            caseTitle={chargeFeeCase.case_title}
            onSubmit={handleFeeChargeSubmit}
            onClose={() => setChargeFeeCase(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ViewCasesAdvocate;
