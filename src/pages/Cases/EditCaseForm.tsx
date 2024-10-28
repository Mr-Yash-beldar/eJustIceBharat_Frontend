import React, { useState } from 'react';

interface EditCaseFormProps {
  caseData: {
    case_title: string;
    case_description: string;
    case_type: string;
    filing_date: string;
    causeOfAction: string;
    urgency_level: string;
    plaintiffName: string;
    plaintiffContactEmail: string;
    plaintiffContactPhone: string;
    plaintiffAddress: string;
    defendantName: string;
    defendantContactEmail: string;
    defendantContactPhone: string;
    defendantAddress: string;
    evidence_provided: string;
    witness_details: string;
    case_status: string;
  };
  onSave: (updatedData: any) => void;
  onCancel: () => void;
}

const EditCaseForm: React.FC<EditCaseFormProps> = ({
  caseData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState(caseData);
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Simulate an API call with a timeout
    setTimeout(() => {
      console.log('Updated Data:', formData); // Print updated data to console
      onSave(formData); // Call the onSave function with updated data
      setLoading(false); // Stop loading
    }, 2000); // Simulate 2 seconds loading time
  };

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="col-span-2">
            <div className="rounded-md border border-gray-300 bg-white shadow-md">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold text-lg">Edit Case Details</h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Case Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Case Title
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      type="text"
                      name="case_title"
                      placeholder="Enter Case Title"
                      value={formData.case_title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Case Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Case Description
                    </label>
                    <textarea
                      className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      name="case_description"
                      placeholder="Provide a detailed description of the case"
                      value={formData.case_description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Case Type and Filing Date in Parallel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Case Type
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="text"
                        name="case_type"
                        placeholder="Civil, Criminal, etc."
                        value={formData.case_type}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Filing Date
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="date"
                        name="filing_date"
                        value={formData.filing_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Cause of Action */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cause Of Action
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      type="text"
                      name="causeOfAction"
                      placeholder="Specify the cause of action"
                      value={formData.causeOfAction}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Urgency Level
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      name="urgency_level"
                      value={formData.urgency_level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          urgency_level: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select Urgency Level
                      </option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Defendant Section */}
                  <div className="col-span-2">
                    <h3 className="font-semibold text-lg mt-4">
                      Defendant Information
                    </h3>
                  </div>

                  {/* Defendant Name and Email in Parallel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Defendant Name
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="text"
                        name="defendantName"
                        placeholder="Enter Defendant Full Name"
                        value={formData.defendantName}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Defendant Email
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="email"
                        name="defendantContactEmail"
                        placeholder="Enter Defendant Email"
                        value={formData.defendantContactEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Defendant Contact Number and Address in Parallel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Defendant Contact Number
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="tel"
                        name="defendantContactPhone"
                        placeholder="Enter Defendant Phone"
                        value={formData.defendantContactPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Defendant Address
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="text"
                        name="defendantAddress"
                        placeholder="Enter Defendant Address"
                        value={formData.defendantAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Evidence and Witness Details */}
                  <div className="col-span-2">
                    <h3 className="font-semibold text-lg mt-4">
                      Additional Information
                    </h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Evidence Provided
                    </label>
                    <textarea
                      className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      name="evidence_provided"
                      placeholder="Provide details of evidence provided"
                      value={formData.evidence_provided}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Witness Details
                    </label>
                    <textarea
                      className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      name="witness_details"
                      placeholder="Provide details of witnesses"
                      value={formData.witness_details}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? 'Updating...' : 'Update Case'}
                    </button>
                    <button
                      type="button"
                      onClick={onCancel}
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCaseForm;
