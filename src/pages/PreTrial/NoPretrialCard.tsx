import React from 'react';

const NoPretrialCard: React.FC = () => (
  <div className="bg-gray-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
    <h2 className="text-3xl font-semibold">No Pretrial Scheduled</h2>
    <p className="mt-6 text-gray-700">
      Your pretrial has not been scheduled yet. Please check back later or
      contact your advocate for updates.
    </p>
  </div>
);

export default NoPretrialCard;
