import React, { useState } from 'react';

interface RegisterCaseFormProps {
  caseTitle: string;
  onClose: () => void;
}

const RegisterCaseForm: React.FC<RegisterCaseFormProps> = ({
  caseTitle,
  onClose,
}) => {
  // Consolidate all attributes into one useState
  const [formData, setFormData] = useState({
    hearingDate: '',
    advocateRemark: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form data change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading state
    setIsLoading(true);

    // Simulate a delay (e.g., API call)
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      setIsLoading(false);
      onClose(); // Close the form after submission
    }, 2000); // Simulate 2 seconds of delay (you can adjust this as needed)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end pb-10">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Register Case: {caseTitle}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Desired Hearing Date:
            <input
              type="date"
              name="hearingDate"
              value={formData.hearingDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-4">
            Advocate Remark:
            <textarea
              name="advocateRemark"
              value={formData.advocateRemark}
              onChange={handleInputChange}
              placeholder="Add your remarks for the case"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              rows={3}
            />
          </label>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCaseForm;
