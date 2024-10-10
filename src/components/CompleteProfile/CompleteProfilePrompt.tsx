import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Adjust the import path

const CompleteProfilePrompt: React.FC = () => {
    const { profileCompletionPercentage } = useAuth();
    const navigate = useNavigate();

    const handleCompleteProfile = () => {
        navigate('/dashboard/CompleteProfile'); // Adjust the path to your profile completion page
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Complete Your Profile</h2>
            <p>Your profile is currently {profileCompletionPercentage}% complete.</p>
            <p>Please complete your profile to access all features.</p>
            <button onClick={handleCompleteProfile} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Complete Profile
            </button>
        </div>
    );
};

export default CompleteProfilePrompt;
