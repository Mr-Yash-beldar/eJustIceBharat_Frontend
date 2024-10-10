
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    // const checkIsAuthenticated = localStorage.getItem('isAuthenticated');
    console.log('isAuthenticated: ', isAuthenticated);

    // If not authenticated, redirect to the login page
    return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
