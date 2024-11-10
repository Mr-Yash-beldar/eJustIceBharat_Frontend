// RegistrationTable.tsx
import React, { useState } from 'react';
import casesData from '../../pages/Cases/Cases';
import RegisterCaseForm from './RegistrationCaseForm';

const RegistrationTable: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const handleRegisterCase = (caseTitle: string) => {
    setSelectedCase(caseTitle);
  };

  const handleCloseForm = () => {
    setSelectedCase(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Case List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Case Title
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Case Type
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Plaintiff Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {casesData.map((caseItem) => (
            <tr key={caseItem.case_title} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300">
                {caseItem.case_title}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {caseItem.case_type}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {caseItem.plaintiffName}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                <button
                  onClick={() => handleRegisterCase(caseItem.case_title)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
                >
                  Register Case to Court
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCase && (
        <RegisterCaseForm caseTitle={selectedCase} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default RegistrationTable;
