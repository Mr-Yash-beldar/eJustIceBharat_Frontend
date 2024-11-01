import React, { useState } from 'react';
import Advocates from '../FindAdvocate/Advocate';
import FeedbackCard from './FeedbackCard'; // Updated to FeedbackCard
import FeedbackModal from './FeedbackModal';

const AdvocateFeedbackPage: React.FC = () => {
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);

  const handleGiveFeedback = (advocate: any) => {
    setSelectedAdvocate(advocate);
  };

  const handleCloseModal = () => {
    setSelectedAdvocate(null);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Advocates.map((advocate) => (
        <FeedbackCard
          key={advocate.id}
          advocate={advocate}
          onGiveFeedback={() => handleGiveFeedback(advocate)}
        />
      ))}
      {selectedAdvocate && (
        <FeedbackModal advocate={selectedAdvocate} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AdvocateFeedbackPage;
