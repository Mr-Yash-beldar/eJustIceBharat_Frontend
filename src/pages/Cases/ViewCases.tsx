import React, { useEffect, useState } from 'react';
import { Case } from '../Cases/Cases';
import Notification from './Notification';
import CaseDetailsModal from './CaseDetail';
import { jsPDF } from 'jspdf';
import axiosInstance from '../../utils/axiosInstance';

const ViewCasesTable: React.FC = () => {
  const token = localStorage.getItem('token');
  const [Cases, setCases] = useState<Case[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>(
    'success',
  );
  const [selectedCase, setSelectedCase] = useState<(typeof Cases)[0] | null>(
    null,
  );
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCases = async () => {
    try {
      const response = await axiosInstance.get('/cases', {
        headers: { Authorization: `Bearer ${token}` },
        
      });
      setCases(response.data.cases);
    } catch (error) {
      console.error('Error fetching advocates:', error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = (index: number, caseStatus: string) => {
    if (caseStatus === 'Filed') {
      setConfirmDeleteIndex(index);
    } else {
      setFeedbackMessage('You cannot delete this case now.');
      setMessageType('error');
    }
  };

  const confirmDelete = (index: number) => {
    const updatedCases = Cases.filter((_, i) => i !== index);
    setCases(updatedCases);
    setFeedbackMessage('Case deleted successfully!');
    setMessageType('success');
    setConfirmDeleteIndex(null);
  };

  const handleView = (caseItem: (typeof Cases)[0]) => {
    setSelectedCase(caseItem);
  };

  const handleDownload = (caseItem: (typeof Cases)[0]) => {
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

  const handleCloseNotification = () => {
    setFeedbackMessage('');
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  const filteredCases = Cases.filter(
    (caseItem) =>
      caseItem.case_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.case_status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-2xl font-bold mb-4">View Cases</h2>
      <div className="w-full mb-6 flex items-center space-x-2 border-2 border-white rounded-lg p-2 shadow-lg bg-white relative">
        <input
          type="text"
          placeholder="Search by Case Title or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 pl-12 pr-4 py-2 w-full focus:ring-0 transition duration-200 ease-in-out"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out">
          Search
        </button>
      </div>

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
            {filteredCases.map((caseItem, index) => (
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
                        <path d="M5 20h14v-2H5v2zm7-18l-7 7h4v6h6v-6h4l-7-7z" />
                      </svg>
                    </button>
                    <button
                      className={`text-gray-600 hover:text-red-600 ${
                        caseItem.case_status === 'Filed'
                          ? ''
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => handleDelete(index, caseItem.case_status)}
                      disabled={caseItem.case_status !== 'Filed'}
                    >
                      {/* Delete Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M15 4V3H9v1H4v2h16V4h-5zM6 20c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7H6v13z" />
                      </svg>
                    </button>
                    {confirmDeleteIndex === index && (
                      <button
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => confirmDelete(index)}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                  {confirmDeleteIndex === index && (
                    <div className="bg-gray-50 border border-gray-200 rounded shadow p-4 mt-2">
                      <p className="text-sm text-gray-600 mb-2">
                        Are you sure you want to delete this case?
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => confirmDelete(index)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => setConfirmDeleteIndex(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCase && (
        <CaseDetailsModal caseData={selectedCase} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ViewCasesTable;
