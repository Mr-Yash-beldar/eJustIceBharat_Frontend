import React from 'react';
import { Advocate } from '../FindAdvocate/Advocate';

interface FeedbackCardProps {
  advocate: Advocate;
  onGiveFeedback: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  advocate,
  onGiveFeedback,
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <img
        src={advocate.profilePicture}
        alt={advocate.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{advocate.name}</h3>
      <button
        onClick={onGiveFeedback}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Give Feedback
      </button>
    </div>
  );
};

export default FeedbackCard;
