import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../constants/apiConstants';
import { ApiResponse, apiService } from './apiService';

// User data interfaces
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  dob: string;
  board: string;
  class: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dob: string;
  board: string;
  class: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

class UserApiService {
  // Register a new user
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.post<ApiResponse<AuthResponse>>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        data
      );
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.post<ApiResponse<AuthResponse>>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        data
      );
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get user profile
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiService.get<ApiResponse<UserProfile>>(
        API_CONFIG.ENDPOINTS.USER.PROFILE
      );
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiService.put<ApiResponse<UserProfile>>(
        API_CONFIG.ENDPOINTS.USER.PROFILE,
        data
      );
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.post<ApiResponse<null>>(
        API_CONFIG.ENDPOINTS.AUTH.LOGOUT
      );
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const userApiService = new UserApiService();

// Example usage functions
export const exampleUsage = {
  // Example: Register a new user
  async registerUser(userData: RegisterData) {
    try {
      const response = await userApiService.register(userData);
      
      if (response.success && response.data) {
        // Store tokens
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        
        return {
          success: true,
          user: response.data.user,
          message: 'Registration successful!'
        };
      } else {
        return {
          success: false,
          message: response.message || 'Registration failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

  // Example: Login user
  async loginUser(credentials: LoginData) {
    try {
      const response = await userApiService.login(credentials);
      
      if (response.success && response.data) {
        // Store tokens
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        
        return {
          success: true,
          user: response.data.user,
          message: 'Login successful!'
        };
      } else {
        return {
          success: false,
          message: response.message || 'Login failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Invalid credentials or network error'
      };
    }
  },

  // Example: Get user profile
  async getUserProfile() {
    try {
      const response = await userApiService.getProfile();
      
      if (response.success && response.data) {
        return {
          success: true,
          profile: response.data
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch profile'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch profile'
      };
    }
  },

  // Example: Update user profile
  async updateUserProfile(updates: Partial<UserProfile>) {
    try {
      const response = await userApiService.updateProfile(updates);
      
      if (response.success && response.data) {
        return {
          success: true,
          profile: response.data,
          message: 'Profile updated successfully!'
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to update profile'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile'
      };
    }
  }
};
