// FeesChargedCard.tsx
import React from 'react';

interface FeesChargedCardProps {
  feesCharged: number;
  loading: boolean;
  onPayFees: () => void;
  paymentMessage: string;
}

const FeesChargedCard: React.FC<FeesChargedCardProps> = ({
  feesCharged,
  loading,
  onPayFees,
  paymentMessage,
}) => (
  <div className="border p-8 rounded-lg shadow-lg bg-white transform translate-x-2 -translate-y-8">
    <h2 className="text-2xl font-bold mb-4">Fees Charged</h2>
    <p className="text-lg">
      Advocate ABC has charged ₹{feesCharged} for case <strong>XYZ</strong>.
      Click the button below to make the payment.
    </p>
    <button
      onClick={onPayFees}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 duration-300"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Pay Fees'}
    </button>
    {paymentMessage && <p className="mt-2 text-green-600">{paymentMessage}</p>}
  </div>
);

export default FeesChargedCard;
