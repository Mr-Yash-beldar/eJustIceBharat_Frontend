import { useState, useEffect } from 'react';

const PayFees = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [feesCharged, setFeesCharged] = useState<number>(0); // Set initial fee charged to 0
  const [showConfirmation, setShowConfirmation] = useState(false); // Track whether to show the confirmation card

  // Simulate fetching fees charged
  const fetchFeesCharged = () => {
    setFeesCharged(30); // Example fee amount
  };

  const handlePayFees = () => {
    setLoading(true);
    const caseName = 'XYZ';
    const advocateName = 'ABC';
    const feeAmount = feesCharged;

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      const message = `₹${feeAmount} paid to Advocate ${advocateName} for case ${caseName}.`;
      setPaymentMessage(message);
      console.log(message); // Print the payment message to the console
      setShowConfirmation(true); // Show confirmation card after payment

      // After 1 minute, revert to "No Fees Charged" card
      setTimeout(() => {
        setFeesCharged(0); // Reset fees to 0
        setShowConfirmation(false); // Hide confirmation card
        setPaymentMessage(''); // Clear payment message
      }, 30000); // 30 seconds for testing (adjust as needed)
    }, 2000); // Simulated payment processing delay
  };

  // Call fetchFeesCharged when the component mounts
  useEffect(() => {
    fetchFeesCharged();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl p-4">
        {/* Conditional Rendering of Cards */}
        {feesCharged === 0 && !showConfirmation ? (
          <div className="border p-8 rounded-lg shadow-lg bg-white transform translate-x-2 -translate-y-16">
            <h2 className="text-2xl font-bold mb-4">No Fees Charged</h2>
            <p className="text-lg">
              Currently, there are no fees charged by Advocate ABC for any
              ongoing cases. Please check back later or consult your advocate
              for more details.
            </p>
          </div>
        ) : (
          <div className="border p-8 rounded-lg shadow-lg bg-white transform translate-x-2 -translate-y-8">
            <h2 className="text-2xl font-bold mb-4">Fees Charged</h2>
            <p className="text-lg">
              Advocate ABC has charged ₹{feesCharged} for case{' '}
              <strong>XYZ</strong>. Click the button below to make the payment.
            </p>
            <button
              onClick={handlePayFees}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 duration-300"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Fees'}
            </button>
            {paymentMessage && (
              <p className="mt-2 text-green-600">{paymentMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PayFees;
