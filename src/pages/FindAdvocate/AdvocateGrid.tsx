import React from 'react';
import AdvocateCard from './AdvocateCard'; // Corrected import for AdvocateCard

interface Advocate {
  id: number;
  name: string;
  email: string;
  state: string;
  district: string;
  gender: string;
  mobile: string;
  language: string;
  aadharProof: string;
  pincode: string;
  location: string;
  distance: string;
  specialization: string;
  ratings: number;
  profilePicture: string;
}

interface AdvocateGridProps {
  advocates: Advocate[]; // The array of advocates
  onViewMore: (advocate: Advocate) => void; // Callback to handle "View More" clicks
}

const AdvocateGrid: React.FC<AdvocateGridProps> = ({
  advocates,
  onViewMore,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {advocates.map((advocate) => (
        <AdvocateCard
          key={advocate.id}
          advocate={advocate}
          onViewMore={() => onViewMore(advocate)} // Pass the current advocate to the callback
        />
      ))}
    </div>
  );
};

export default AdvocateGrid;
