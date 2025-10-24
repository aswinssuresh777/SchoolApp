import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

export interface UserData {
  id?: string;
  first_name: string;
  last_name: string;
  student_code: string;
  email: string;
  password?: string;
  dob: Date;
  gender: string;
  board: string;
  class: string;
  isLoggedIn: boolean;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppState {
  userData: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  lastLogin?: Date;
}

type AppAction = 
  | { type: 'SET_USER_DATA'; payload: UserData }
  | { type: 'CLEAR_USER_DATA' }
  | { type: 'UPDATE_USER_DATA'; payload: Partial<UserData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_LAST_LOGIN'; payload: Date }
  | { type: 'INITIALIZE_APP'; payload: Partial<AppState> };

const initialState: AppState = {
  userData: null,
  isLoading: true,
  isAuthenticated: false,
  theme: 'light',
  language: 'en',
  notifications: true,
  lastLogin: undefined,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: true,
        isLoading: false,
        lastLogin: new Date(),
      };
    case 'CLEAR_USER_DATA':
      return {
        ...state,
        userData: null,
        isAuthenticated: false,
        isLoading: false,
        lastLogin: undefined,
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        userData: state.userData ? { ...state.userData, ...action.payload } : null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'SET_LAST_LOGIN':
      return {
        ...state,
        lastLogin: action.payload,
      };
    case 'INITIALIZE_APP':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  // User actions
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  
  // App settings
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  
  // Utility functions
  initializeApp: () => Promise<void>;
  logout: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // User actions
  const setUserData = (data: UserData) => {
    dispatch({ type: 'SET_USER_DATA', payload: data });
  };

  const clearUserData = () => {
    dispatch({ type: 'CLEAR_USER_DATA' });
  };

  const updateUserData = (updates: Partial<UserData>) => {
    dispatch({ type: 'UPDATE_USER_DATA', payload: updates });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setAuthenticated = (authenticated: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: authenticated });
  };

  // App settings
  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setLanguage = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setNotifications = (enabled: boolean) => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: enabled });
  };

  // Utility functions
  const initializeApp = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load saved data from storage
      const savedData = await AsyncStorage.getItem('appState');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert date strings back to Date objects
        if (parsedData.userData?.dob) {
          parsedData.userData.dob = new Date(parsedData.userData.dob);
        }
        if (parsedData.lastLogin) {
          parsedData.lastLogin = new Date(parsedData.lastLogin);
        }
        dispatch({ type: 'INITIALIZE_APP', payload: parsedData });
      } else {
        dispatch({ type: 'INITIALIZE_APP', payload: {} });
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      dispatch({ type: 'INITIALIZE_APP', payload: {} });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'refreshToken', 'appState']);
      dispatch({ type: 'CLEAR_USER_DATA' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('appState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const loadFromStorage = async () => {
    try {
      const savedData = await AsyncStorage.getItem('appState');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.userData?.dob) {
          parsedData.userData.dob = new Date(parsedData.userData.dob);
        }
        if (parsedData.lastLogin) {
          parsedData.lastLogin = new Date(parsedData.lastLogin);
        }
        dispatch({ type: 'INITIALIZE_APP', payload: parsedData });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  };

  // Auto-save to storage when state changes
  useEffect(() => {
    if (!state.isLoading) {
      saveToStorage();
    }
  }, [state]);

  // Initialize app on mount
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      setUserData,
      clearUserData,
      updateUserData,
      setLoading,
      setAuthenticated,
      setTheme,
      setLanguage,
      setNotifications,
      initializeApp,
      logout,
      saveToStorage,
      loadFromStorage,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Main app hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// User-specific hook (backward compatibility)
export const useUser = () => {
  const { state, setUserData, clearUserData, updateUserData, setLoading } = useApp();
  return {
    state: {
      userData: state.userData,
      isLoading: state.isLoading,
    },
    setUserData,
    clearUserData,
    updateUserData,
    setLoading,
  };
};

// Theme hook
export const useTheme = () => {
  const { state, setTheme } = useApp();
  return {
    theme: state.theme,
    setTheme,
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light',
  };
};

// Settings hook
export const useSettings = () => {
  const { state, setLanguage, setNotifications } = useApp();
  return {
    language: state.language,
    notifications: state.notifications,
    setLanguage,
    setNotifications,
  };
};

// Auth hook
export const useAuth = () => {
  const { state, setAuthenticated, logout } = useApp();
  return {
    isAuthenticated: state.isAuthenticated,
    isLoggedIn: state.isAuthenticated,
    user: state.userData,
    setAuthenticated,
    logout,
  };
};
