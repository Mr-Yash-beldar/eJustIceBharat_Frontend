import React, { useEffect, useState } from 'react';
import { Case } from '../../pages/Cases/Cases';
import CaseCard from './CaseCard';
import CaseDetailsModal from './CaseDetailsModel';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

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

const CaseList: React.FC = () => {
  const token = localStorage.getItem('token');
  const [cases, setCases] = useState<Case[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [maxLimitMessage, setMaxLimitMessage] = useState('');
  const maxVisibleCount = cases.length;

  const fetchCaseData = async () => {
    try {
      const response = await axiosInstance.get('/request/getAll', {
        params: { case_status: 'requested' }, // Pass filter via query params
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

  const handleViewMore = (caseData: Case) => {
    setSelectedCase(caseData);
  };

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 6;
    setVisibleCount(newVisibleCount);

    if (newVisibleCount >= maxVisibleCount) {
      setMaxLimitMessage('All cases have been displayed.');
    }
  };

  const casesToDisplay = cases.slice(0, visibleCount);
  const currentPage = Math.ceil(visibleCount / 6);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {casesToDisplay.map((caseItem: any, index) => (
          <CaseCard
            key={index}
            caseData={caseItem}
            onViewMore={() => handleViewMore(caseItem)}
          />
        ))}
      </div>

      {visibleCount < maxVisibleCount && (
        <div className="text-center my-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg transition duration-200 ease-in-out"
          >
            Load More
          </button>
        </div>
      )}

      {maxLimitMessage && (
        <div className="text-red-500 text-center">{maxLimitMessage}</div>
      )}

      <div className="text-center mt-4">
        {cases.length ? (
          <span>
            Page {currentPage} of {Math.ceil(maxVisibleCount / 6)}
          </span>
        ) : (
          <span>No Cases Found</span>
        )}
      </div>

      {selectedCase && (
        <CaseDetailsModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
          onAccept={() => toast.success('Case Accepted')}
          onReject={() => console.log('Case rejected:', selectedCase)}
        />
      )}
    </div>
  );
};

export default CaseList;
