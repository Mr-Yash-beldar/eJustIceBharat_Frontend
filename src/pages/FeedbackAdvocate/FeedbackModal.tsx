import React, { useState } from 'react';
import { Advocate } from '../FindAdvocate/Advocate';

interface FeedbackModalProps {
  advocate: Advocate;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ advocate, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Descriptions for each star rating
  const ratingDescriptions = [
    '1 - Bad',
    '2 - Fair',
    '3 - Good',
    '4 - Very Good',
    '5 - Excellent',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async submission, such as an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(
      `Feedback for ${advocate.name}: ${feedback}, Rating: ${rating}`,
    );
    setFeedback('');
    setRating(0);
    setLoading(false);
    onClose();
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          Feedback for {advocate.name}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Star Rating Description Guide */}
          <div className="mb-4 text-gray-700 text-sm">
            {ratingDescriptions.map((desc, index) => (
              <div key={index} className="flex items-center">
                <span className="font-semibold">{index + 1}:</span>{' '}
                <span className="ml-2">{desc.split(' - ')[1]}</span>
              </div>
            ))}
          </div>

          {/* Star Rating */}
          <div className="mb-2 flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={`text-2xl mx-1 ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-400'
                }`}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Current Rating Description */}
          <div className="mb-4 text-center text-gray-600">
            {rating > 0 ? ratingDescriptions[rating - 1] : 'Select a rating'}
          </div>

          {/* Feedback Text Area */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            className="w-full h-32 p-2 border rounded mb-4"
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <span className="loader animate-spin border-t-2 border-white border-solid rounded-full w-4 h-4"></span>
                  <span>Submitting...</span>
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
