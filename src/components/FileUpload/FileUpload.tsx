import React, { useEffect, useState } from 'react';
import sign from '../../images/user/E-signature.png';
import Aadhar from '../../images/user/AadharProof.png';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

interface ESignatureUploadProps {
  fileDoc?: string;
  uploadFor?: string;
  model: string;
}

const FileUpload: React.FC<ESignatureUploadProps> = ({
  fileDoc,
  uploadFor,
  model,

}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [docName, setDocName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const token = localStorage.getItem('token');
  const demoProfile = "https://getillustrations.b-cdn.net//packs/purrity-illustrations/avatars/_1x/avatars%20and%20characters%20_%20uniform,%20suit,%20tie,%20blazer,%20formal,%20man,%20male,%20person,%20profile,%20avatar_demo.png";

  const getDocument = (uplodedFile: string) => {
    switch (uplodedFile) {
      case "profile":
        setDocName('profile_image');
        setTitle('Profile Image');
        break;
      case "otherDocument":
        setDocName('other_document');
        setTitle('E-signature');
        break;
      case "aadhaar":
        setDocName('aadhar_document');
        setTitle('Aadhar Proof');
        break;
      default:
        throw new Error("Invalid model type");
    }
  };


  // Use useEffect to set docName when uploadFor changes
  useEffect(() => {
    if (uploadFor) {
      getDocument(uploadFor);
    }
  }, [uploadFor]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Optional chaining
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append(docName, file);

    if (token) {
      try {
        const response = await axiosInstance.put(
          `/files/upload/${model}/${uploadFor}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status !== 200) { // Check if the response status is not 200 (OK)
          toast.error('File upload failed');
        }

        const result = response.data; // Get the data directly from the response
        toast.success(result.message);
        // Optionally handle the response further
      } catch (error: unknown) {
        // Type assertion for error
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
        setFile(null); // Reset the file after upload if needed
        setFileName('');
      }
    } else {
      toast.error('No token found');
      setLoading(false);
    }
  };


  return (
    <>
      <div className="mb-5.5 flex items-center gap-3 mt-4">

        {/* Increase margin-top to mt-4 */}
        <div className="h-14 w-14 rounded-full overflow-hidden mt-4">

          {/* Increase margin-top to mt-4 */}

          {uploadFor === "otherDocument" || uploadFor === "aadhaar" ? (
            <img
              src={uploadFor === "otherDocument" ? sign : Aadhar}
              alt={title}
              className="object-cover h-full w-full"
            />
          ) : (
            <img
              src={uploadFor === "profile" ? fileDoc : demoProfile}
              alt={title}
              className="object-cover h-full w-full"
            />
          )}

        </div>
        <div className="mt-4">
          <h3 className="font-medium text-black dark:text-white">{title}</h3>
          <span className="flex gap-2.5 mt-1">
          <button
              className={`text-sm text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : `Save ${title}`}
          </button>

          </span>
        </div>
      </div>

      <div

        className="relative block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-5"
      >
        <input
          type="file"
          accept="application/pdf,image/*"
          name="other_document"
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            {fileDoc ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/14090/14090371.png"
                alt="Uploaded Document"
              />
            ) : (
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
            )}
          </span>
          {fileName && <span className="text-sm text-black">{fileName}</span>}
          {fileDoc ? (
            <>
              <span className="text-center text-sm text-primary">
                You Have Uploaded Your {title} You can Update it
                Here
              </span>
              <span className="text-center text-sm text-primary">
                ?
              </span>
              <span className="text-center text-sm text-primary">
                Update {title}
              </span>
            </>
          ) : (
            <>
              <span className="text-center text-sm text-primary">
                Drag and drop your {title} here
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
    </>
  );
};

export default FileUpload;
