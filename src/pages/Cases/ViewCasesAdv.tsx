import React, { useState } from 'react';
import casesData from './Cases'; // Import CaseType from Cases.ts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CaseDetailsModal from './CaseDetail';
import { Case } from './Cases'; // Ensure to import the Case interface if it's exported

const RequestCasesTable: React.FC = () => {
  const [caseData, setCaseData] = useState<Case[]>(casesData);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAccept = (index: number) => {
    const updatedCases = caseData.map((caseItem, i) =>
      i === index ? { ...caseItem, case_status: 'Accepted' as const } : caseItem
    );
    setCaseData(updatedCases);
    toast.success('Case request accepted!');
  };

  const handleReject = (index: number) => {
    const updatedCases = caseData.map((caseItem, i) =>
      i === index ? { ...caseItem, case_status: 'Rejected' as const } : caseItem
    );
    setCaseData(updatedCases);
    toast.error('Case request rejected.');
  };

  const handleView = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCases = caseData.filter((caseItem) =>
    caseItem.case_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-2xl font-bold mb-4">Request Cases</h2>
      
      <input
        type="text"
        placeholder="Search by Case Title..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 w-2/3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Case Title</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Case Type</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600">Request Actions</th>
              <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600">Case Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-700">{caseItem.case_title}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{caseItem.case_type}</td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caseItem.case_status === 'Accepted'
                        ? 'bg-green-100 text-green-600'
                        : caseItem.case_status === 'Rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {caseItem.case_status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 mr-2"
                    onClick={() => handleAccept(index)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </button>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleView(caseItem)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedCase && <CaseDetailsModal caseData={selectedCase} onClose={handleCloseModal} />}
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
};

export default RequestCasesTable;
