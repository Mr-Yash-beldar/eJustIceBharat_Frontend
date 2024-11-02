// PaymentConfirmationCard.tsx
import React from 'react';

interface PaymentConfirmationCardProps {
  paymentMessage: string;
}

const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({
  paymentMessage,
}) => (
  <div className="border p-8 rounded-lg shadow-lg bg-white transform translate-x-2 -translate-y-10">
    <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>
    <p className="text-lg text-green-600">{paymentMessage}</p>
  </div>
);

export default PaymentConfirmationCard;
