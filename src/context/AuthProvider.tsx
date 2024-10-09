import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface AuthContextType {
    isAuthenticated: boolean;
    profileCompleted: boolean;
    profileCompletionPercentage: number;
    loading: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(0);
    const [loading, setLoading] = useState(true);

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await axiosInstance.get('/auth/verifyLitigant-token', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (data.valid) {
                    setIsAuthenticated(true);
                    
                    const profileResponse = await axiosInstance.get('/litigants/getDetails', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const { isCompleted, completionPercentage } = profileResponse.data;
                    setProfileCompleted(isCompleted);
                    setProfileCompletionPercentage(completionPercentage);
                } else {
                    setIsAuthenticated(false);
                  
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
             
            }
        } else {
            console.log('No token found');
            setIsAuthenticated(false);
        }

        setLoading(false);
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.setItem("isAuthenticated", "false");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, profileCompleted, profileCompletionPercentage, loading, logout }}>
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
