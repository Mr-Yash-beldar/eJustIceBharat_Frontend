import React from 'react';

interface NotificationCardProps {
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ onClick }) => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mb-6">
    <p className="font-semibold">You have new notifications!</p>
    <button onClick={onClick} className="mt-2 text-blue-500 hover:underline">
      Go to Notifications
    </button>
  </div>
);

export default NotificationCard;
