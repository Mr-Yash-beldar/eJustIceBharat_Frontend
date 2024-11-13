// FeedbackCard.tsx

import React from 'react';
import { FaStar } from 'react-icons/fa';

type Feedback = {
  plaintiffName: string;
  rating: number;
  suggestion: string;
};

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">
          {feedback.plaintiffName}
        </h2>
        <div className="flex items-center">
          <span className="text-yellow-500 font-semibold mr-1">
            {feedback.rating}
          </span>
          <FaStar className="text-yellow-500" />
        </div>
      </div>
      <p className="text-gray-600 mt-2">{feedback.suggestion}</p>
    </div>
  );
};

export default FeedbackCard;
