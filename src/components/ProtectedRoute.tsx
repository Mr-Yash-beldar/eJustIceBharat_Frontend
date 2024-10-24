
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Adjust the import path

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    console.log('isAuthenticated: ', isAuthenticated);

    // If not authenticated, redirect to the login page
    return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
