import React from 'react';

interface AdvocateProps {
  advocate: {
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
  };
  onViewMore: () => void; // Add the onViewMore prop here
}

const AdvocateCard: React.FC<AdvocateProps> = ({ advocate, onViewMore }) => {
  const fullStars = Math.floor(advocate.ratings); // Full stars count
  const partialStar = advocate.ratings - fullStars; // Fractional part for the last star (0 to 1)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src={advocate.profilePicture}
        alt={advocate.name}
        className="mx-auto rounded-full w-24 h-24 mb-4 border-2 border-blue-500"
      />
      <h2 className="text-xl font-bold text-gray-800">{advocate.name}</h2>
      <p className="text-gray-500 text-sm">{advocate.email}</p>
      <p className="text-gray-600 text-sm">{advocate.location}</p>
      <p className="text-gray-600 text-sm">
        Distance: {advocate.distance || 'N/A'}
      </p>
      <p className="text-gray-600 text-sm">
        Specialization: {advocate.specialization}
      </p>

      <div className="flex justify-center mt-2 space-x-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={index} className="text-yellow-500">
            ★
          </span>
        ))}

        {/* Partial star */}
        {partialStar > 0 && (
          <span className="relative inline-block">
            <span className="text-gray-300">★</span>
            <span
              className="text-yellow-500 absolute top-0 left-0"
              style={{
                width: `${partialStar * 100}%`,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              ★
            </span>
          </span>
        )}

        {/* Empty stars */}
        {Array.from({ length: 5 - Math.ceil(advocate.ratings) }, (_, index) => (
          <span key={index} className="text-gray-300">
            ★
          </span>
        ))}
      </div>

      <button
        onClick={onViewMore} // Trigger onViewMore when clicked
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        View More
      </button>
    </div>
  );
};

export default AdvocateCard;
