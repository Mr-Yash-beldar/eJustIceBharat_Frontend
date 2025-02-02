import React from 'react';
import App from '../../components/Meeting/App';
import { useLocation } from 'react-router-dom';

const Meeting: React.FC = () => {

  const location = useLocation();
  const { meetingCode } = location.state || {};
  console.log('meetingCode:', meetingCode);
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Meeting</h2>
      <App/>
    </div>
  );
};

export default Meeting;
