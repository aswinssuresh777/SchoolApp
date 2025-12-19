// Base URL based on environment
export const BASE_URL = 'https://infoapidev.thulirhoney.com';

// API Endpoints
export const URLS = {
    // Auth URLs
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/signup`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    GET_BOARDS: `${BASE_URL}/api/classes/boards`,
    GET_CLASSES: (boardId: string) => `${BASE_URL}/api/classes?board_id=${boardId}`,
    GET_UNITS: (subjectId: string) => `${BASE_URL}/api/questions/topics/${subjectId}`,



    // User URLs
    GET_PROFILE: `${BASE_URL}/api/auth/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/update`,
    CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,

    // Student URLs
    GET_STUDENTS: `${BASE_URL}/students`,
    GET_STUDENT_DETAILS: `${BASE_URL}/students/`,  // Append student ID when using
    UPDATE_STUDENT: `${BASE_URL}/students/`,       // Append student ID when using


    GET_SUBJECTS:(classId:string) =>`${BASE_URL}/api/classes/${classId}`,
     GET_UNIT_QUESTIONS:(subjectId:string,topicId:string) =>`${BASE_URL}/api/questions/study?class_subject_id=${subjectId}&topic_id=${topicId}`,
    GENERATE_ASSESSMENT:`${BASE_URL}/api/assessments/generate`,
    SUBMIT_ASSESMENT:`${BASE_URL}/api/assessments/submit-answer`,
    GET_ASSESMENT_RESULT:(assesmentId:string)=> `${BASE_URL}/api/assessments/results/${assesmentId}`,
    GET_OVERALL_RESULT:`${BASE_URL}/api/assessments/history`,
  // Append class ID when using


   GET_DASHBOARD_DATA:`${BASE_URL}/api/dashboard/overview`,
}