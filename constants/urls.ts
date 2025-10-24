// Base URL based on environment
export const BASE_URL = __DEV__ 
    ? 'http://localhost:3000/api'
    : 'https://api.schoolapp.com/api';

// API Endpoints
export const URLS = {
    // Auth URLs
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',

    // User URLs
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
    CHANGE_PASSWORD: '/user/change-password',

    // Student URLs
    GET_STUDENTS: '/students',
    GET_STUDENT_DETAILS: '/students/',  // Append student ID when using
    UPDATE_STUDENT: '/students/',       // Append student ID when using

    // Class URLs
    GET_CLASSES: '/classes',
    GET_CLASS_DETAILS: '/classes/',     // Append class ID when using
}