// API URLs Configuration
export const API_CONFIG = {
    // Base URLs for different environments
    BASE_URL: {
        DEVELOPMENT: 'http://localhost:3000/api',
        STAGING: 'https://staging-api.schoolapp.com/api',
        PRODUCTION: 'https://api.schoolapp.com/api'
    },
    
    // Current environment
    CURRENT_ENV: __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION',
    
    // API Endpoints
    ENDPOINTS: {
        // Auth endpoints
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            FORGOT_PASSWORD: '/auth/forgot-password',
            RESET_PASSWORD: '/auth/reset-password',
            REFRESH_TOKEN: '/auth/refresh-token',
        },
        
        // User endpoints
        USER: {
            PROFILE: '/user/profile',
            UPDATE_PROFILE: '/user/update',
            CHANGE_PASSWORD: '/user/change-password',
        },
        
        // Add more endpoint categories as needed
    }
};

// Helper function to get the complete API URL
export const getApiUrl = (endpoint: string): string => {
    const baseUrl = API_CONFIG.BASE_URL[API_CONFIG.CURRENT_ENV];
    return `${baseUrl}${endpoint}`;
};