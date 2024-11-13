import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';


interface AuthContextType {
  isAuthenticated: boolean;
  profileCompleted: boolean;
  profileCompletionPercentage: number;
  loading: boolean;
  role: string;
  setIsAuthenticated: (value: boolean) => void;
  setRole: (value: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [profileCompletionPercentage, setProfileCompletionPercentage] =
    useState(0);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState<string>('');
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await axiosInstance.get('/auth/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.valid) {
          console.log(data);
          setIsAuthenticated(true);
          setRole(data.user.role);

          const profileResponse = await axiosInstance.get(
            `/${data.user.role}s/getDetails`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          // toast.success('Refreshed');

          const { isCompleted, completionPercentage } = profileResponse.data;
          setProfileCompleted(isCompleted);
          setProfileCompletionPercentage(completionPercentage);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: any) {
        toast.error('Error verifying User:', error);
        console.log(error);
        setIsAuthenticated(false);
      }
    } else {
      toast.error('No User found');
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
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profileCompleted,
        profileCompletionPercentage,
        loading,
        logout,
        role,
        setRole,
      }}
    >
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
