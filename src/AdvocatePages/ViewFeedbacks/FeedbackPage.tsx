// FeedbackPage.tsx

import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import FaStar from react-icons
import feedbackData from './feedbackData'; // Import your feedback data
import FeedbackCard from './FeedbackCard'; // Import the FeedbackCard component

const FeedbackPage: React.FC = () => {
  // Calculate the overall rating
  const totalRating = feedbackData.reduce(
    (sum, feedback) => sum + feedback.rating,
    0,
  );
  const overallRating = feedbackData.length
    ? (totalRating / feedbackData.length).toFixed(1)
    : '0';

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-lg mx-auto text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Feedback Page</h1>
        <div className="mt-4 flex justify-center items-center">
          <span className="text-xl font-semibold text-yellow-500">
            {overallRating}
          </span>
          <FaStar className="text-yellow-500 ml-1" />
        </div>
        <p className="text-gray-600">Overall Rating</p>
      </div>

      <div>
        {feedbackData.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
