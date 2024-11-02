// CompleteProfileCard.tsx
import React from 'react';

interface CompleteProfileCardProps {
  children: React.ReactNode;
}

const CompleteProfileCard: React.FC<CompleteProfileCardProps> = ({
  children,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform -translate-y-15">
        {children}
      </div>
    </div>
  );
};

export default CompleteProfileCard;
