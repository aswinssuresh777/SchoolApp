import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: __DEV__ 
        ? 'http://localhost:3000/api'
        : 'https://api.schoolapp.com/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor - adds auth token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handles errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            await AsyncStorage.removeItem('userToken');
            // You can add navigation logic here if needed
        }
        return Promise.reject(error);
    }
);

// API methods
export const apiClient = {
    get: async <T>(endpoint: string, params = {}) => {
        try {
            const response = await api.get<T>(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    },

    post: async <T>(endpoint: string, data = {}) => {
        try {
            const response = await api.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    },

    put: async <T>(endpoint: string, data = {}) => {
        try {
            const response = await api.put<T>(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    },

    delete: async <T>(endpoint: string) => {
        try {
            const response = await api.delete<T>(endpoint);
            return response.data;
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
};

// Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}

// Example API endpoints
export const endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        forgotPassword: '/auth/forgot-password'
    },
    user: {
        profile: '/user/profile',
        updateProfile: '/user/update'
    }
};