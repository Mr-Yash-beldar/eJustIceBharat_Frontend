import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import axios from 'axios';
import FileUpload from '../../components/FileUpload/FileUpload';
import { toast } from 'react-toastify';

const CompleteProfileAdvocate: React.FC = () => {
  // const [updated, setUpdated] = useState(false);
  //define the type for LitigantLocation
  // interface LitigantLocation {
  //   coordinates: [string, string]; // [latitude, longitude]
  //   type: string; // "Point"
  // }

  // Define a type for LitigantDetails
  interface AdvocateDetailsType {
    fullName?: string;
    state?: string;
    email?: string;
    district?: string;
    gender?: string;
    dateOfBirth?: string;
    mobileNumber?: string;
    barLicenseNumber?: string;
    specialization?: string;
    preferred_language?: string;
    pincode?: string;
    advocate_lat?: string;
    advocate_long?: string;
    other_document?: string;
    aadhar_document?: string;
    profile_image?: string;
  }

  // Initialize LitigantDetails with an empty object of type LitigantDetailsType
  const [AdvocateDetails, setAdvocateDetails] = useState<AdvocateDetailsType>(
    {},
  );
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  //const token = localStorage.getItem('token');

  // Example of a function to set latitude and longitude
  // const setLatLong = (litigantLocation: LitigantLocation) => {
  //   const { coordinates } = litigantLocation; // Destructure coordinates array
  //   if (coordinates && coordinates.length === 2) {
  //     // console.log('Coordinates ', coordinates);
  //     // Check if the coordinates array has both latitude and longitude
  //     const [longitude, latitude] = coordinates; // Destructure the coordinates array
  //     setLitigantDetails((prevDetails) => ({
  //       ...prevDetails,
  //       litigant_lat: latitude, // Set latitude
  //       litigant_long: longitude, // Set longitude
  //     }));
  //   } else {
  //     toast.error('No coordinates found');
  //   }
  // };

  //get data for litigant
  // const getLitigantData = async () => {
  //   if (token) {
  //     try {
  //       const litigantDetails = await axiosInstance.get(
  //         '/litigants/getDetails',
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );
  //       setLatLong(litigantDetails.data.litigant.litigant_location);
  //       setLitigantDetails(litigantDetails.data.litigant);
  //     } catch (error: unknown) {
  //       if (axios.isAxiosError(error) && error.response) {
  //         // Handle AxiosError with specific status
  //         if (error.response.status === 404) {
  //           // Litigant not found
  //           toast.error(error.response.data.error); // Show alert with the error message
  //         } else if (error.response.status === 400) {
  //           // email cannot update
  //           toast.error(error.response.data.error);
  //         } else {
  //           // Handle other HTTP errors
  //           toast.error('An error occurred. Please try again later.');
  //         }
  //       } else {
  //         // Handle unknown or non-Axios errors
  //         toast.error('An unexpected error occurred. ');
  //       }
  //     } finally {
  //       setLoading(false); // Disable loading
  //     }
  //   } else {
  //     setLoading(false);
  //     toast.error('No token found');
  //   }

  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getLitigantData();
  // }, [updated]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdvocateDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const data: { [key: string]: any } = {}; // Initialize an empty object for the data
  // Check each field and only add it to data if it has a value
  if (AdvocateDetails.fullName) data.fullName = AdvocateDetails.fullName;
  if (AdvocateDetails.state) data.litigant_state = AdvocateDetails.state;
  if (AdvocateDetails.district)
    data.litigant_district = AdvocateDetails.district;
  if (AdvocateDetails.gender) data.litigant_gender = AdvocateDetails.gender;
  if (AdvocateDetails.dateOfBirth)
    data.litigant_dob = AdvocateDetails.dateOfBirth;
  if (AdvocateDetails.preferred_language)
    data.litigant_preferred_language = AdvocateDetails.preferred_language;
  if (AdvocateDetails.mobileNumber)
    data.litigant_mob = AdvocateDetails.mobileNumber;
  if (AdvocateDetails.barLicenseNumber)
    data.litigant_lang = AdvocateDetails.barLicenseNumber;
  if (AdvocateDetails.specialization)
    data.litigant_lang = AdvocateDetails.specialization;
  if (AdvocateDetails.pincode) data.litigant_pincode = AdvocateDetails.pincode;
  if (AdvocateDetails.advocate_lat)
    data.litigant_lat = AdvocateDetails.advocate_lat; // Add latitude if it's set
  if (AdvocateDetails.advocate_long)
    data.litigant_long = AdvocateDetails.advocate_long; // Add longitude if it's set

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    navigate('/dashboard/AdvocateCompleteProfile');
    // if (token) {
    //   try {
    //     const response = await axiosInstance.post(
    //       '/litigants/completeProfile',
    //       data,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       },
    //     );
    //console.log('Data ', data);
    //     toast.success(response.data.message);
    //     navigate('/dashboard/CompleteProfile');
    //   } catch (error: unknown) {
    //     if (axios.isAxiosError(error) && error.response) {
    //       // Handle AxiosError with specific status
    //       if (error.response.status === 404) {
    //         // Litigant not found
    //         toast.error(error.response.data.error);
    //         // Show alert with the error message
    //       } else if (error.response.status === 400) {
    //         // email cannot update
    //         toast.error(error.response.data.error);
    //       } else {
    //         // Handle other HTTP errors
    //         toast.error('An error occurred. Please try again later.');
    //       }
    //     } else {
    //       // Handle unknown or non-Axios errors
    //       toast.error('An unexpected error occurred.');
    //     }
    //   } finally {
    //     setLoading(false); // Disable loading
    //   }
    // } else {
    //   setLoading(false);
    //   toast.error('No token found');
    // }

    setLoading(false);
    toast.success('Profile is Completed');
    // setUpdated(!updated);
    window.location.reload();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString(); // Get latitude
          const longitude = position.coords.longitude.toString(); // Get longitude
          setAdvocateDetails((prevDetails) => ({
            ...prevDetails,
            litigant_lat: latitude, // Set latitude
            litigant_long: longitude, // Set longitude
          }));
          console.log(
            `Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`,
          );
        },
        (error) => {
          toast.error('Error fetching location'); // Log the error message
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('The request to get user location timed out.');
              break;
            case 3: // This corresponds to UNKNOWN_ERROR
              toast.error('An unknown error occurred.');
              break;
          }
        },
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Complete Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Devid Jhon"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.fullName}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="email"
                      name="email"
                      id="emailAddress"
                      placeholder="advocate@gmail.com"
                      disabled
                      value={AdvocateDetails.email}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="LicenseNumber"
                    >
                      Bar License Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="string"
                      name="barLicenseNumber"
                      id="LicenseNumber"
                      placeholder="Bar License Number"
                      disabled
                      value={AdvocateDetails.barLicenseNumber}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="specialization"
                    >
                      Specialization
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="specialization"
                      id="specialization"
                      placeholder="Specialization"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.specialization}
                    />
                  </div>

                  {/* State */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.state}
                    />
                  </div>

                  {/* District */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="district"
                    >
                      District
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="district"
                      id="district"
                      placeholder="District"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.district}
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      name="gender"
                      id="gender"
                      value={AdvocateDetails.gender}
                      onChange={(e) =>
                        setAdvocateDetails({
                          ...AdvocateDetails,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="dob"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="date"
                      name="dateOfBirth"
                      id="dob"
                      value={AdvocateDetails.dateOfBirth}
                      onChange={inputChangeHandler}
                    />
                  </div>

                  {/* Mobile */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="mobile"
                    >
                      Mobile
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="tel"
                      name="mobileNumber"
                      id="mobile"
                      placeholder="Mobile Number"
                      value={AdvocateDetails.mobileNumber}
                      onChange={inputChangeHandler}
                    />
                  </div>

                  {/* Language */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="language"
                    >
                      Language
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="preferred_language"
                      id="language"
                      placeholder="Preferred Language"
                      value={AdvocateDetails.preferred_language}
                      onChange={inputChangeHandler}
                    />
                  </div>

                  {/* Pin Code */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="pinCode"
                    >
                      Pin Code
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="pincode"
                      id="pinCode"
                      placeholder="Pin Code"
                      value={AdvocateDetails.pincode}
                      onChange={inputChangeHandler}
                    />
                  </div>

                  {/* Latitude */}
                  <div className="mb-5.5">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="advocate_lat"
                      id="lat"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.advocate_lat}
                      disabled
                      hidden
                    />
                  </div>

                  {/* Longitude */}
                  <div className="mb-5.5">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="advocate_long"
                      id="long"
                      onChange={inputChangeHandler}
                      value={AdvocateDetails.advocate_long}
                      disabled
                      hidden
                    />
                  </div>

                  {/* Get My Location Button */}
                  <div className="mb-5.5">
                    <button
                      type="button"
                      onClick={getLocation}
                      className="rounded bg-success py-2 px-4 text-white"
                    >
                      Get My Location
                    </button>
                  </div>

                  {/* Buttons for Save Changes and Cancel */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                      onClick={() => {
                        setAdvocateDetails({
                          fullName: '',
                          state: '',
                          district: '',
                          gender: '',
                          dateOfBirth: '',
                          mobileNumber: '',
                          barLicenseNumber: '',
                          specialization: '',
                          pincode: '',
                          preferred_language: '',
                        });
                      }}
                      disabled={loading} // Disable if loading
                    >
                      Cancel
                    </button>
                    <button
                      className={`flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading} // Disable if loading
                    >
                      {loading ? (
                        <>
                          Loading
                          <svg
                            className="animate-spin h-5 w-5 text-white"
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
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark"></div>
              <div className="p-5">
                {/* Profile Image Upload Section */}
                <FileUpload
                  fileDoc={AdvocateDetails.profile_image}
                  uploadFor={'profile'}
                  model={'advocate'}
                />

                {/* New Aadhaar Proof Upload Section */}
                <FileUpload
                  fileDoc={AdvocateDetails.aadhar_document}
                  uploadFor={'aadhaar'}
                  model={'advocate'}
                />

                {/* E-signature Upload Section */}
                <FileUpload
                  fileDoc={AdvocateDetails.other_document}
                  uploadFor={'otherDocument'}
                  model={'advocate'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfileAdvocate;
