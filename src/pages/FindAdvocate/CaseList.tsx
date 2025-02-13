import React, { useEffect, useState } from 'react';
// import {Case} from '../Cases/Cases';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'; // Paper plane icon for "send" and spinner for loading
import Loader from '../../common/Loader';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

interface SendRequestProps {
  advocateName: string;
  advocateId:string;
}

const SendRequest: React.FC<SendRequestProps> = ({ advocateName, advocateId}) => {
  const token = localStorage.getItem('token');
  const [Cases,setCases]=useState<any[]>([]);
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
          case_status:'rejected,filed',
        },
      });

      // console.log(response.data.cases);
      setCases(response.data.cases);

      // console.log(response.data.cases)

    } catch (error) {
      console.error('Error fetching advocates:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log("cases:", Cases);

  useEffect(() => {
    fetchCases(); // Fetch advocates on initial load or when filters change
  }, []);

  const handleRequest:any = async (
    caseTitle: string,
    caseId: string,
    advocateId: string
  ) => {
    console.log(caseId);
    setLoadingCases(caseTitle); // Set loading state for the case
    console.log(`Request started for case: ${caseTitle} to advocate ${advocateName}`);
  
    try {
      const response = await axiosInstance.post('/request/create', {
        caseId,
        advocateId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      // Handle successful response
      console.log(`Request sent for case: ${caseTitle}`, response.data);
  
      setLoadingCases(null); // Reset loading state
      toast.success(`Request sent successfully for case: ${caseTitle} to advocate: ${advocateName}`, {
        position: "top-right",
        autoClose: 3000,
      });
      setSuccessMessage(`Request sent successfully for case: ${caseTitle} to advocate: ${advocateName}`);
    } catch (error) {
      console.log(`advocateId is ${advocateId} caseId is ${caseId}`)
      console.error(`Error sending request for case: ${caseTitle}`, error);
      setLoadingCases(null); // Reset loading state
  
      toast.error(`Failed to send request for case: ${caseTitle}. Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
                onClick={() => handleRequest(caseItem.case_title, caseItem._id, advocateId)}
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
