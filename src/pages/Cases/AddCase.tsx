import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const AddCase: React.FC = () => {
  const [loading, setLoading] = useState(false); // Add loading state

  const [formData, setFormData] = useState({
    case_title: '',
    case_description: '',
    case_type: '',
    filing_date: '',
    causeOfAction: '',
    urgency_level: '',
    plaintiffName: '',
    plaintiffContactEmail: '',
    plaintiffContactPhone: '',
    plaintiffAddress: '',
    defendantName: '',
    defendantContactEmail: '',
    defendantContactPhone: '',
    defendantAddress: '',
    evidence_provided: '',
    witness_details: '',
  });

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const data = {
        case_title: formData.case_title,
        case_description: formData.case_description,
        case_type: formData.case_type,
        filing_date: formData.filing_date,
        causeOfAction: formData.causeOfAction,
        urgency_level: formData.urgency_level,
        plaintiffName: formData.plaintiffName,
        plaintiffContactEmail: formData.plaintiffContactEmail,
        plaintiffContactPhone: formData.plaintiffContactPhone,
        plaintiffAddress: formData.plaintiffAddress,
        defendantName: formData.defendantName,
        defendantContactEmail: formData.defendantContactEmail,
        defendantContactPhone: formData.defendantContactPhone,
        defendantAddress: formData.defendantAddress,
        evidence_provided: formData.evidence_provided,
        witness_details: formData.witness_details,
      };

      console.log('Saved data', data);
      setLoading(false);
      navigate('/dashboard/viewCase');
    }, 2000);
  };

  return (
    <>
      <div className="mx-auto max-w-full px-8 py-8">
        <Breadcrumb pageName="Case Registration" />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Case Registration
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Case Title */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="caseTitle"
                      >
                        Case Title
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="case_title"
                        id="caseTitle"
                        placeholder="Enter Case Title"
                        onChange={inputChangeHandler}
                        value={formData.case_title}
                        required
                      />
                    </div>

                    {/* Case Description */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="case_description"
                      >
                        Case Description
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        name="case_description"
                        id="case_description"
                        placeholder="Provide a detailed description of the case"
                        onChange={inputChangeHandler}
                        value={formData.case_description}
                        required
                      />
                    </div>

                    {/* Case Type */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="case_type"
                      >
                        Case Type
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="case_type"
                        id="case_type"
                        placeholder="Civil, Criminal, etc."
                        onChange={inputChangeHandler}
                        value={formData.case_type}
                        required
                      />
                    </div>

                    {/* Filing Date */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="filing_date"
                      >
                        Filing Date
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="date"
                        name="filing_date"
                        id="filing_date"
                        onChange={inputChangeHandler}
                        value={formData.filing_date}
                        required
                      />
                    </div>

                    {/* Cause of Action */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="causeOfAction"
                      >
                        Cause Of Action
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="causeOfAction"
                        id="causeOfAction"
                        placeholder="Specify the cause of action"
                        onChange={inputChangeHandler}
                        value={formData.causeOfAction}
                        required
                      />
                    </div>

                    {/* Urgency Level */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="urgency_level"
                      >
                        Urgency Level
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        name="urgency_level"
                        id="urgency_level"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            urgency_level: e.target.value,
                          })
                        }
                        value={formData.urgency_level}
                        required
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
                      <h3 className="font-semibold text-lg">
                        Defendant Information
                      </h3>
                    </div>

                    {/* Defendant Name */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="defendantName"
                      >
                        Defendant Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="defendantName"
                        id="defendantName"
                        placeholder="Enter Defendant Full Name"
                        onChange={inputChangeHandler}
                        value={formData.defendantName}
                      />
                    </div>

                    {/* Defendant Email */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="defendantEmail"
                      >
                        Defendant Email
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="email"
                        name="defendantContactEmail"
                        id="defendantEmail"
                        placeholder="Enter Defendant Email"
                        onChange={inputChangeHandler}
                        value={formData.defendantContactEmail}
                      />
                    </div>

                    {/* Defendant Contact Number */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="defendantPhone"
                      >
                        Defendant Contact Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="defendantContactPhone"
                        id="defendantPhone"
                        placeholder="Enter Defendant Phone"
                        onChange={inputChangeHandler}
                        value={formData.defendantContactPhone}
                      />
                    </div>

                    {/* Defendant Address */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="defendantAddress"
                      >
                        Defendant Address
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="defendantAddress"
                        id="defendantAddress"
                        placeholder="Enter Defendant Address"
                        onChange={inputChangeHandler}
                        value={formData.defendantAddress}
                      />
                    </div>

                    {/* Additional Fields */}
                    <div className="col-span-2">
                      <h3 className="font-semibold text-lg">
                        Additional Information
                      </h3>
                    </div>

                    {/* Evidence Provided */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="evidence_provided"
                      >
                        Evidence Provided
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        type="text"
                        name="evidence_provided"
                        id="evidence_provided"
                        placeholder="Summary of evidence"
                        onChange={inputChangeHandler}
                        value={formData.evidence_provided}
                      />
                    </div>

                    {/* Court Location */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="witness_details"
                      >
                        Witness Details
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                        name="witness_details"
                        id="witness_details"
                        placeholder="Provide witness information"
                        onChange={inputChangeHandler}
                        value={formData.witness_details}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4.5 mt-6">
                    {/* Cancel Button */}
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={() => {
                        setFormData({
                          case_title: '',
                          case_description: '',
                          case_type: '',
                          filing_date: '',
                          causeOfAction: '',
                          urgency_level: '',
                          plaintiffName: '',
                          plaintiffContactEmail: '',
                          plaintiffContactPhone: '',
                          plaintiffAddress: '',
                          defendantName: '',
                          defendantContactEmail: '',
                          defendantContactPhone: '',
                          defendantAddress: '',
                          evidence_provided: '',
                          witness_details: '',
                        });
                      }}
                      disabled={loading} // Disable if loading
                    >
                      Cancel
                    </button>

                    {/* Register Case Button */}
                    <button
                      className={`flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      type="submit"
                      disabled={loading} // Disable if loading
                    >
                      {loading ? (
                        <>
                          Registering Case
                          <svg
                            className="animate-spin h-5 w-5 text-white ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        'Register Case'
                      )}
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

export default AddCase;
