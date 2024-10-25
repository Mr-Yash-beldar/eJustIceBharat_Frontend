import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },  
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response; // Return the response if no error
    },
    (error: any) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error); // Reject the promise with the error
    }
);

export default axiosInstance;
