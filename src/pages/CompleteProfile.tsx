import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import FileUpload from '../components/FileUpload/FileUpload';

const CompleteProfile: React.FC = () => {
  //define the type for LitigantLocation
  interface LitigantLocation {
    coordinates: [string, string]; // [latitude, longitude]
    type: string; // "Point"
  }

  // Define a type for LitigantDetails
  interface LitigantDetailsType {
    litigant_name?: string;
    litigant_state?: string;
    litigant_email?: string;
    litigant_district?: string;
    litigant_gender?: string;
    litigant_dob?: string;
    litigant_mob?: string;
    litigant_lang?: string;
    litigant_preferred_language?: string;
    litigant_pincode?: string;
    litigant_lat?: string;
    litigant_long?: string;
    other_document?: string;
    aadhar_document?: string;
    profile_image?: string;
  }

  // Initialize LitigantDetails with an empty object of type LitigantDetailsType
  const [LitigantDetails, setLitigantDetails] = useState<LitigantDetailsType>(
    {},
  );
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  //profile image upload
  const handelProfileUpload = () => {
    console.log('Profile Image Upload');
  };
 
  // Example of a function to set latitude and longitude
  const setLatLong = (litigantLocation: LitigantLocation) => {
    const { coordinates } = litigantLocation; // Destructure coordinates array
    if (coordinates && coordinates.length === 2) {
      // console.log('Coordinates ', coordinates);
      // Check if the coordinates array has both latitude and longitude
      const [longitude, latitude] = coordinates; // Destructure the coordinates array
      setLitigantDetails((prevDetails) => ({
        ...prevDetails,
        litigant_lat: latitude, // Set latitude
        litigant_long: longitude, // Set longitude
      }));
    } else {
      console.log('No coordinates found');
    }
  };

  //get data for litigant
  const getLitigantData = async () => {
    if (token) {
      try {
        const litigantDetails = await axiosInstance.get(
          '/litigants/getDetails',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setLatLong(litigantDetails.data.litigant.litigant_location);
        setLitigantDetails(litigantDetails.data.litigant);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Handle AxiosError with specific status
          if (error.response.status === 404) {
            // Litigant not found
            alert(error.response.data.error); // Show alert with the error message
          } else if (error.response.status === 400) {
            // email cannot update
            alert(error.response.data.error);
          } else {
            // Handle other HTTP errors
            alert('An error occurred. Please try again later.');
          }
        } else {
          // Handle unknown or non-Axios errors
          alert('An unexpected error occurred. ');
        }
      } finally {
        setLoading(false); // Disable loading
      }
    } else {
      setLoading(false);
      console.log('No token found');
    }

    setLoading(false);
  };

  useEffect(() => {
    getLitigantData();
  }, []);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLitigantDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const data: { [key: string]: any } = {}; // Initialize an empty object for the data
  // Check each field and only add it to data if it has a value
  if (LitigantDetails.litigant_name)
    data.litigant_name = LitigantDetails.litigant_name;
  if (LitigantDetails.litigant_state)
    data.litigant_state = LitigantDetails.litigant_state;
  if (LitigantDetails.litigant_district)
    data.litigant_district = LitigantDetails.litigant_district;
  if (LitigantDetails.litigant_gender)
    data.litigant_gender = LitigantDetails.litigant_gender;
  if (LitigantDetails.litigant_dob)
    data.litigant_dob = LitigantDetails.litigant_dob;
  if (LitigantDetails.litigant_preferred_language)
    data.litigant_preferred_language =
      LitigantDetails.litigant_preferred_language;
  if (LitigantDetails.litigant_mob)
    data.litigant_mob = LitigantDetails.litigant_mob;
  if (LitigantDetails.litigant_lang)
    data.litigant_lang = LitigantDetails.litigant_lang;
  if (LitigantDetails.litigant_pincode)
    data.litigant_pincode = LitigantDetails.litigant_pincode;
  if (LitigantDetails.litigant_lat)
    data.litigant_lat = LitigantDetails.litigant_lat; // Add latitude if it's set
  if (LitigantDetails.litigant_long)
    data.litigant_long = LitigantDetails.litigant_long; // Add longitude if it's set

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (token) {
      try {
        const response = await axiosInstance.post(
          '/litigants/completeProfile',
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log('Data ', data);
        alert(response.data.message);
        navigate('/dashboard/CompleteProfile');
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // Handle AxiosError with specific status
          if (error.response.status === 404) {
            // Litigant not found
            alert(error.response.data.error); // Show alert with the error message
          } else if (error.response.status === 400) {
            // email cannot update
            alert(error.response.data.error);
          } else {
            // Handle other HTTP errors
            alert('An error occurred. Please try again later.');
          }
        } else {
          // Handle unknown or non-Axios errors
          alert('An unexpected error occurred.');
        }
      } finally {
        setLoading(false); // Disable loading
      }
    } else {
      setLoading(false);
      console.log('No token found');
    }

    setLoading(false);
    navigate('/dashboard/CompleteProfile');
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString(); // Get latitude
          const longitude = position.coords.longitude.toString(); // Get longitude
          setLitigantDetails((prevDetails) => ({
            ...prevDetails,
            litigant_lat: latitude, // Set latitude
            litigant_long: longitude, // Set longitude
          }));
          console.log(
            `Latitude: ${position.coords.latitude} and Longitude: ${position.coords.longitude}`,
          );
        },
        (error) => {
          console.error('Error fetching location', error.message); // Log the error message
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case 3: // This corresponds to UNKNOWN_ERROR
              console.error('An unknown error occurred.');
              break;
          }
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
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
                      name="litigant_name"
                      id="fullName"
                      placeholder="Devid Jhon"
                      onChange={inputChangeHandler}
                      value={LitigantDetails.litigant_name}
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
                      name="litigant_email"
                      id="emailAddress"
                      placeholder="litigant@gmail.com"
                      disabled
                      value={LitigantDetails.litigant_email}
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
                      name="litigant_state"
                      id="state"
                      placeholder="State"
                      onChange={inputChangeHandler}
                      value={LitigantDetails.litigant_state}
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
                      name="litigant_district"
                      id="district"
                      placeholder="District"
                      onChange={inputChangeHandler}
                      value={LitigantDetails.litigant_district}
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
                      name="litigant_gender"
                      id="gender"
                      value={LitigantDetails.litigant_gender}
                      onChange={(e) =>
                        setLitigantDetails({
                          ...LitigantDetails,
                          litigant_gender: e.target.value,
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
                      name="litigant_dob"
                      id="dob"
                      value={LitigantDetails.litigant_dob}
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
                      name="litigant_mob"
                      id="mobile"
                      placeholder="Mobile Number"
                      value={LitigantDetails.litigant_mob}
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
                      name="litigant_preferred_language"
                      id="language"
                      placeholder="Preferred Language"
                      value={LitigantDetails.litigant_preferred_language}
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
                      name="litigant_pincode"
                      id="pinCode"
                      placeholder="Pin Code"
                      value={LitigantDetails.litigant_pincode}
                      onChange={inputChangeHandler}
                    />
                  </div>

                  {/* Latitude */}
                  <div className="mb-5.5">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="litigant_lat"
                      id="lat"
                      onChange={inputChangeHandler}
                      value={LitigantDetails.litigant_lat}
                      disabled
                      hidden
                    />
                  </div>

                  {/* Longitude */}
                  <div className="mb-5.5">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black"
                      type="text"
                      name="litigant_long"
                      id="long"
                      onChange={inputChangeHandler}
                      value={LitigantDetails.litigant_long}
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
                        setLitigantDetails({
                          litigant_name: '',
                          litigant_state: '',
                          litigant_district: '',
                          litigant_gender: '',
                          litigant_dob: '',
                          litigant_mob: '',
                          litigant_lang: '',
                          litigant_pincode: '',
                          litigant_preferred_language: '',
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
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img
                      src={LitigantDetails.profile_image}
                      alt="User"
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-black dark:text-white">
                      Upload your photo
                    </span>
                    <span className="flex gap-2.5">
                      <button
                        className="text-sm hover:text-primary"
                        onClick={handelProfileUpload}
                      >
                        Save Profile
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    name="litigant_profile"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      {LitigantDetails.profile_image ? (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/14090/14090371.png"
                          alt="User"
                        />
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2V7.33337H14.9997C15.3679 7.33337 15.6663 7.63185 15.6663 8C15.6663 8.36815 15.3679 8.66667 14.9997 8.66667H8.66634V14C8.66634 14.3682 8.36786 14.6667 7.99967 14.6667C7.63148 14.6667 7.33301 14.3682 7.33301 14V8.66667H1.99967C1.63148 8.66667 1.33301 8.36815 1.33301 8C1.33301 7.63185 1.63148 7.33337 1.99967 7.33337H7.99967V2C7.99967 1.63185 8.29815 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    {LitigantDetails.profile_image ? (
                      <>
                        <span className="text-center text-sm text-primary">
                          You Have Uploaded Your Profile You can Update it Here
                        </span>
                        <span className="text-center text-sm text-primary">
                          ?
                        </span>
                        <span className="text-center text-sm text-primary">
                          Update Profile
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-center text-sm text-primary">
                          Drag and drop your Photo here
                        </span>
                        <span className="text-center text-sm text-primary">
                          or
                        </span>
                        <span className="text-center text-sm text-primary">
                          Browse
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* New Aadhaar Proof Upload Section */}
                  <FileUpload fileDoc={LitigantDetails.aadhar_document} uploadFor={"aadhaar"} model={"litigant"}/>
                
                  {/* E-signature Upload Section */}
                  <FileUpload fileDoc={LitigantDetails.other_document} uploadFor={"otherDocument"} model={"litigant"}/>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
