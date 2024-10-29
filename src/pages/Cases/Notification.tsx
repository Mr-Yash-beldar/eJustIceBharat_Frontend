// Notification.tsx
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const notificationStyle =
    type === 'success'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600';

  return (
    <div className={`p-2 w-full z-50 ${notificationStyle} rounded mb-2`}>
      <div className="flex items-center justify-between">
        <p className="text-center text-sm whitespace-nowrap">{message}</p>
        <button onClick={onClose} className="ml-2 text-lg">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
