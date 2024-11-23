import { useNavigate } from "react-router-dom";

export function LeaveScreen({ setIsMeetingLeft }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-white text-4xl">You left the meeting!</h1>
      <div className="mt-12">
        {/* Rejoin the Meeting Button */}
        <button
          className="w-full bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>

        {/* Go to Home Button */}
        <button
          className="w-full bg-blue-500 text-white px-16 py-3 rounded-lg text-sm mt-4"
          onClick={() => {
            // Redirect to Advocate Home with role set as "advocate"
            navigate("/dashboard/advocateHome", { state: { role: "advocate" } });
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
