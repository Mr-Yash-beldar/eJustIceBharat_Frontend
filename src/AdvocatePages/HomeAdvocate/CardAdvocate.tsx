import React from 'react';

interface CardProps {
  cardTitle: string;
  value: number;
  className?: string; // Optional className prop
  style?: React.CSSProperties; // Optional style prop
}

const CardAdvocate: React.FC<CardProps> = ({
  cardTitle,
  value,
  className,
  style,
}) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 ${className}`}
      style={style}
    >
      <h2 className="text-xl font-bold">{cardTitle}</h2>
      <p className="text-gray-700">{value}</p>
    </div>
  );
};

export default CardAdvocate;
