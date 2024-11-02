import { useNavigate } from 'react-router-dom';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const profileCompletion = 75; // Hardcoded profile completion percentage

  // Define color based on profile completion percentage
  const getCompletionColor = () => {
    if (profileCompletion >= 75) return 'bg-green-400';
    if (profileCompletion >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Profile Completion</h2>
      <div className="relative w-40 h-40 mx-auto">
        {/* Donut background circle */}
        <div className="w-full h-full rounded-full border-8 border-gray-200 absolute"></div>

        {/* Donut chart progress */}
        <div
          className={`w-full h-full rounded-full border-8 ${getCompletionColor()} absolute`}
          style={{
            clipPath: `inset(${100 - profileCompletion}% 0 0 0)`,
          }}
        ></div>

        {/* Centered text */}
        <div className="flex items-center justify-center h-full absolute inset-0">
          <span className="text-2xl font-bold">{profileCompletion}%</span>
        </div>
      </div>

      {/* Button to complete profile if under 100% */}
      {profileCompletion < 100 && (
        <button
          onClick={() => navigate('/dashboard/CompleteProfile')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Complete Profile
        </button>
      )}
    </div>
  );
};

export default ProfileCompletion;
