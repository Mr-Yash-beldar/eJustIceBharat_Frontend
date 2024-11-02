// NoFeesChargedCard.tsx
import React from 'react';

const NoFeesChargedCard: React.FC = () => (
  <div className="border p-8 rounded-lg shadow-lg bg-white transform translate-x-2 -translate-y-16">
    <h2 className="text-2xl font-bold mb-4">No Fees Charged</h2>
    <p className="text-lg">
      Currently, there are no fees charged by Advocate ABC for any ongoing
      cases. Please check back later or consult your advocate for more details.
    </p>
  </div>
);

export default NoFeesChargedCard;
