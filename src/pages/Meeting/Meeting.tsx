import React from 'react';
import App from '../../components/Meeting/App';

const Meeting: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Meeting</h2>

      <App />
    </div>
  );
};

export default Meeting;
