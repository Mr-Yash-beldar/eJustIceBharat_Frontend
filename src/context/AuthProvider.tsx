import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import your axiosInstance

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Verify token using your axiosInstance
                const response = await axiosInstance.get('/auth/verifyLitigant-token', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Check response and set authentication state
                if (response.data.valid) { // Assuming your API returns a 'valid' property
                    // console.log('Token verified.');
                    setIsAuthenticated(true);
                } else {
                    console.error('Token verification failed.');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        }
    };

    useEffect(() => {
        verifyToken();
    }, []); // This effect runs once on component mount

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
