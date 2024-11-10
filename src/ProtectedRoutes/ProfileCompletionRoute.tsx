import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Adjust the import path
import CompleteProfilePrompt from '../components/CompleteProfile/CompleteProfilePrompt'; // Import the prompt component

interface ProfileCompletionRouteProps {
  children: JSX.Element;
}

const ProfileCompletionRoute: React.FC<ProfileCompletionRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, profileCompleted } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!profileCompleted) {
    return <CompleteProfilePrompt />; // Display the prompt if profile is incomplete
  }

  return children; // Render the protected content if profile is complete
};

export default ProfileCompletionRoute;
