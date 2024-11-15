import React, { useState, useEffect } from 'react';
import NoFeesChargedCard from './NoFeesChargedCard';
import FeesChargedCard from './FeesChargedCard';
import PaymentConfirmationCard from './PaymentConfirmationCard';

interface PayFeesProps {
  caseTitle: string;
}

const PayFees: React.FC<PayFeesProps> = ({ caseTitle }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [feesCharged, setFeesCharged] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchFeesCharged = () => {
    setFeesCharged(30); // Simulated fee amount
  };

  const handlePayFees = () => {
    setLoading(true);
    const advocateName = 'ABC';
    const feeAmount = feesCharged;

    setTimeout(() => {
      setLoading(false);
      const message = `₹${feeAmount} paid to Advocate ${advocateName} for case ${caseTitle}.`;
      setPaymentMessage(message);
      console.log(message);
      setShowConfirmation(true);

      setTimeout(() => {
        setFeesCharged(0);
        setShowConfirmation(false);
        setPaymentMessage('');
      }, 30000); // Reset after 30 seconds
    }, 2000); // Simulate payment processing delay
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
