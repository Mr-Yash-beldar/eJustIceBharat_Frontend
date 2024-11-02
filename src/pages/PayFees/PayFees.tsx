// PayFees.tsx
import React, { useState, useEffect } from 'react';
import NoFeesChargedCard from './NoFeesChargedCard';
import FeesChargedCard from './FeesChargedCard';
import PaymentConfirmationCard from './PaymentConfirmationCard';

const PayFees: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [feesCharged, setFeesCharged] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchFeesCharged = () => {
    setFeesCharged(30);
  };

  const handlePayFees = () => {
    setLoading(true);
    const caseName = 'XYZ';
    const advocateName = 'ABC';
    const feeAmount = feesCharged;

    setTimeout(() => {
      setLoading(false);
      const message = `₹${feeAmount} paid to Advocate ${advocateName} for case ${caseName}.`;
      setPaymentMessage(message);
      console.log(message);
      setShowConfirmation(true);

      setTimeout(() => {
        setFeesCharged(0);
        setShowConfirmation(false);
        setPaymentMessage('');
      }, 30000);
    }, 2000);
  };

  useEffect(() => {
    fetchFeesCharged();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl p-4">
        {feesCharged === 0 && !showConfirmation ? (
          <NoFeesChargedCard />
        ) : showConfirmation ? (
          <PaymentConfirmationCard paymentMessage={paymentMessage} />
        ) : (
          <FeesChargedCard
            feesCharged={feesCharged}
            loading={loading}
            onPayFees={handlePayFees}
            paymentMessage={paymentMessage}
          />
        )}
      </div>
    </div>
  );
};

export default PayFees;
