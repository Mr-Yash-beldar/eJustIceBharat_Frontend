import React from 'react';

const CompletedPretrialCard: React.FC = () => (
  <div className="bg-yellow-200 p-12 rounded-lg shadow-lg text-center w-[600px]">
    <h2 className="text-3xl font-semibold">Pretrial Completed</h2>
    <p className="mt-6 text-gray-700">
      The pretrial has recently taken place. If you have any questions, please
      contact your advocate.
    </p>
  </div>
);

export default CompletedPretrialCard;
