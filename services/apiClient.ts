// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { BASE_URL } from '../constants/urls';

// // Create axios instance
// const api = axios.create({
//     baseURL: BASE_URL,
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

// // Add token to requests
// api.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('userToken');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Handle response errors
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401) {
//             await AsyncStorage.removeItem('userToken');
//         }
//         return Promise.reject(error);
//     }
// );

// // API Types
// export interface LoginData {
//     email: string;
//     password: string;
// }

// export interface UserData {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
// }

// export interface ApiResponse<T> {
//     data: T;
//     message: string;
//     success: boolean;
// }

// // Simple API functions
// export const apiClient = {
//     get: async <T>(url: string,data:any) => {
//         const response = await api.get<ApiResponse<T>>(url,data);
//         return response.data.data;
//     },

//     post: async <T>(url: string, data: any) => {
//         const response = await api.post<ApiResponse<T>>(url, data);
//         return response.data.data;
//     },

//     put: async <T>(url: string, data: any) => {
//         const response = await api.put<ApiResponse<T>>(url, data);
//         return response.data.data;
//     },

//     delete: async <T>(url: string) => {
//         const response = await api.delete<ApiResponse<T>>(url);
//         return response.data.data;
//     }
// };