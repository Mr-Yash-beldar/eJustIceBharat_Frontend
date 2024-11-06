import React, { useEffect, useState } from 'react';
// import cases from '../Cases/Cases';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'; // Paper plane icon for "send" and spinner for loading
import Loader from '../../common/Loader';
import axiosInstance from '../../utils/axiosInstance';

interface SendRequestProps {
  advocateName: string;
}

interface Case {
  case_title: string;
  case_description: string;
  case_type: string;
  filing_date: string; // Format: YYYY-MM-DD
  causeOfAction: string;
  urgency_level: string; // E.g., 'High', 'Medium', 'Low'
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
  case_status: 'Filed' | 'Requested' | 'Accepted' | 'Registered' | 'Closed'; // New attribute
}

const SendRequest: React.FC<SendRequestProps> = ({ advocateName }) => {
  const token = localStorage.getItem('token');
  const [Cases,setCases]=useState<Case[]>([]);
  const [loading,setLoading]=useState(false) ;
  const [loadingCases, setLoadingCases] = useState<string | null>(null); // State to track loading case title
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

  // cases?case_status=Requested,Filed

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/cases', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          case_status:'Requested,Filed',
        },
      });

      // console.log(response.data.cases);
      setCases(response.data.cases);

    } catch (error) {
      console.error('Error fetching advocates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases(); // Fetch advocates on initial load or when filters change
  }, []);

  const handleRequest = (caseTitle: string) => {
    setLoadingCases(caseTitle); // Set loading state for the case
    console.log(
      `Request started for case: ${caseTitle} to advocate ${advocateName}`,
    );

    setTimeout(() => {
      console.log(`Request sent for case: ${caseTitle}`);
      setLoadingCases(null); // Reset loading state
      setSuccessMessage(
        `Request sent successfully for case: ${caseTitle} to advocate: ${advocateName}`,
      ); // Set success message

      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Adjust duration as needed
    }, 2000); // Simulate loading for 2 seconds
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Cases to Request</h2>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <ul className="space-y-2">
          {Cases.map((caseItem, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white"
            >
              <div>
                <h3 className="font-medium">{caseItem.case_title}</h3>
                <p>{caseItem.case_description}</p>
                <p className="text-sm text-gray-500">
                  Status: {caseItem.case_status}
                </p>{' '}
                {/* Status display */}
              </div>
              <button
                onClick={() => handleRequest(caseItem.case_title)}
                className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
                disabled={loadingCases === caseItem.case_title}
              >
                {loadingCases === caseItem.case_title ? (
                  <FaSpinner className="animate-spin mr-2" /> // Spinner while loading
                ) : (
                  <FaPaperPlane className="mr-2" /> // Send icon
                )}
                {loadingCases === caseItem.case_title
                  ? 'Sending...'
                  : 'Send Request'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SendRequest;
