import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, getApiUrl } from '../constants/apiConstants';

class ApiService {
    private static instance: ApiService;
    private api: AxiosInstance;
    private isRefreshing: boolean = false;
    private refreshSubscribers: ((token: string) => void)[] = [];

    private constructor() {
        // Create axios instance
        this.api = axios.create({
            baseURL: API_CONFIG.BASE_URL[API_CONFIG.CURRENT_ENV as keyof typeof API_CONFIG.BASE_URL],
            timeout: 30000, // 30 seconds
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Setup interceptors
        this.setupInterceptors();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.api.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config;
                
                // Handle 401 - Unauthorized error (token expired)
                if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Wait for token refresh
                        return new Promise(resolve => {
                            this.refreshSubscribers.push((token: string) => {
                                if (originalRequest.headers) {
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                }
                                resolve(this.api(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        // Try to refresh token
                        const refreshToken = await AsyncStorage.getItem('refreshToken');
                        const response = await this.api.post(
                            getApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN),
                            { refreshToken }
                        );

                        const { token } = response.data;
                        await AsyncStorage.setItem('userToken', token);

                        // Notify subscribers that token has been refreshed
                        this.refreshSubscribers.forEach(callback => callback(token));
                        this.refreshSubscribers = [];
                        
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return this.api(originalRequest);

                    } catch (refreshError) {
                        // Token refresh failed, redirect to login
                        await AsyncStorage.multiRemove(['userToken', 'refreshToken']);
                        // You might want to implement a callback for navigation
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    // Generic request method
    private async request<T>(method: string, url: string, data?: any, config?: any): Promise<T> {
        try {
            const response = await this.api.request({
                method,
                url: getApiUrl(url),
                data,
                ...config
            });
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    // HTTP methods
    public async get<T>(url: string, config?: any): Promise<T> {
        return this.request<T>('GET', url, undefined, config);
    }

    public async post<T>(url: string, data?: any, config?: any): Promise<T> {
        return this.request<T>('POST', url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: any): Promise<T> {
        return this.request<T>('PUT', url, data, config);
    }

    public async delete<T>(url: string, config?: any): Promise<T> {
        return this.request<T>('DELETE', url, undefined, config);
    }

    // Error handling
    private handleError(error: AxiosError): void {
        if (error.response) {
            // Server responded with error status
            console.error('Response Error:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            // Request was made but no response
            console.error('Request Error:', error.request);
        } else {
            // Error in request setup
            console.error('Error:', error.message);
        }
    }
}

// Export singleton instance
export const apiService = ApiService.getInstance();

// Type for API response
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}