// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { Alert } from 'react-native';

// // Create axios instance
// const api = axios.create({
//     baseURL:'https://infoapidev.thulirhoney.com/',
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

// // Request interceptor - adds auth token
// api.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('userToken');
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//             console.log('working token',token)
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor - handles errors
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         console.log('error',error?.response?.data)
//         Alert.alert(
//             'Error',
//             error?.response?.data?.message || 'Something went wrong. Please try again.',
//             [{ text: 'OK', style: 'cancel' }]
//           );
          
//         if (error.response?.status === 401) {
//             // Token expired or invalid
//             Alert.alert(`${error?.response?.data?.message}`)
//             await AsyncStorage.removeItem('userToken');
//             // You can add navigation logic here if needed
//         }
//         return Promise.reject(error);
//     }
// );

// // API methods
// export const apiClient = {
//     get: async <T>(endpoint: string, params = {}) => {
//         try {
//             const response = await api.get<T>(endpoint, { params });
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             console.error('GET Error:', error);
//             throw error;
//         }
//     },

//     post: async <T>(endpoint: string, data = {}) => {
//         try {
//             const response = await api.post<T>(endpoint, data);
//             return response.data;
//         } catch (error) {
//             console.error('POST Error:', error);
//             throw error;
//         }
//     },

//     put: async <T>(endpoint: string, data = {}) => {
//         try {
//             const response = await api.put<T>(endpoint, data);
//             return response.data;
//         } catch (error) {
//             console.error('PUT Error:', error);
//             throw error;
//         }
//     },

//     delete: async <T>(endpoint: string) => {
//         try {
//             const response = await api.delete<T>(endpoint);
//             return response.data;
//         } catch (error) {
//             console.error('DELETE Error:', error);
//             throw error;
//         }
//     }
// };

// // Types
// export interface ApiResponse<T = any> {
//     success: boolean;
//     data?: T;
//     message?: string;
// }

// // Example API endpoints
// export const endpoints = {
//     auth: {
//         login: '/auth/login',
//         register: '/auth/register',
//         forgotPassword: '/auth/forgot-password'
//     },
//     user: {
//         profile: '/user/profile',
//         updateProfile: '/user/update'
//     }
// };


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

// Create axios instance
const api = axios.create({
  baseURL: 'https://infoapidev.thulirhoney.com/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 🧩 Request Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log(
        '\n🟢 [API REQUEST]',
        '\nURL: ', config.baseURL + config.url,
        '\nMethod:', config.method?.toUpperCase(),
        '\nHeaders:', config.headers,
        '\nParams:', config.params,
        '\nData:', config.data,
        '\n───────────────────────────────'
      );

      return config;
    } catch (err) {
      console.error('❌ Error reading token:', err);
      return config;
    }
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// 🧩 Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(
      '\n✅ [API RESPONSE]',
      '\nURL:', response.config.baseURL + response.config.url,
      '\nStatus:', response.status,
      '\nData:', response.data,
      '\n───────────────────────────────'
    );
    return response;
  },
  async (error) => {
    console.error(
      '\n🚨 [API ERROR]',
      '\nURL:', error?.config?.baseURL + error?.config?.url,
      '\nStatus:', error?.response?.status,
      '\nData:', error?.response?.data,
      '\nMessage:', error?.message,
      '\n───────────────────────────────'
    );

    const message =
      error?.response?.data?.message ||
      'Something went wrong. Please try again.';

    Alert.alert('Error', message, [{ text: 'OK', style: 'cancel' }]);

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userToken');
      Alert.alert('Session expired', 'Please log in again.');
      // optionally trigger navigation here
    }

    return Promise.reject(error);
  }
);

// 🧩 API methods
export const apiClient = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('❌ GET Error:', error.message);
      throw error;
    }
  },

  post: async (endpoint, data = {}) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('❌ POST Error:', error.message);
      throw error;
    }
  },

  put: async (endpoint, data = {}) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('❌ PUT Error:', error.message);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('❌ DELETE Error:', error.message);
      throw error;
    }
  },
};

// 🧩 Example endpoints (for reference)
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },
  user: {
    profile: '/user/profile',
    updateProfile: '/user/update',
  },
};
