// CompleteProfilePrompt.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Adjust the import path
import CompleteProfileCard from './CompleteProfileCard'; // Import the card component

const CompleteProfilePrompt: React.FC = () => {
  const { profileCompletionPercentage } = useAuth();
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate('/dashboard/CompleteProfile'); // Adjust the path to your profile completion page
  };

  return (
    <CompleteProfileCard>
      <div style={{ textAlign: 'center' }}>
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        <p className="text-lg mb-2">
          Your profile is currently {profileCompletionPercentage}% complete.
        </p>
        <p className="text-lg mb-4">
          Please complete your profile to access all features.
        </p>
        <button
          onClick={handleCompleteProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 duration-300"
        >
          Complete Profile
        </button>
      </div>
    </CompleteProfileCard>
  );
};

export default CompleteProfilePrompt;
