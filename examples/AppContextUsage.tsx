import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp, useUser, useTheme, useSettings, useAuth } from '../context/UserContext';

// Example component showing all the different ways to use the app context
export default function AppContextUsageExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Context Usage Examples</Text>
      
      {/* Example 1: Using the main useApp hook */}
      <MainAppExample />
      
      {/* Example 2: Using specific hooks */}
      <SpecificHooksExample />
      
      {/* Example 3: Theme management */}
      <ThemeExample />
      
      {/* Example 4: Settings management */}
      <SettingsExample />
      
      {/* Example 5: Authentication */}
      <AuthExample />
    </View>
  );
}

// Example 1: Main app hook - access everything
function MainAppExample() {
  const { state, setUserData, setTheme, setLanguage, logout } = useApp();
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Main App Hook (useApp)</Text>
      <Text>User: {state.userData?.name || 'Not logged in'}</Text>
      <Text>Theme: {state.theme}</Text>
      <Text>Language: {state.language}</Text>
      <Text>Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}
      >
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

// Example 2: Specific hooks for focused functionality
function SpecificHooksExample() {
  const { state, setUserData, clearUserData } = useUser();
  
  const handleLogin = () => {
    setUserData({
      name: 'John Doe',
      email: 'john@example.com',
      dob: new Date('2000-01-01'),
      board: 'CBSE',
      class: '10th',
      isLoggedIn: true,
    });
  };
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>User Hook (useUser)</Text>
      <Text>User Data: {state.userData?.name || 'None'}</Text>
      <Text>Loading: {state.isLoading ? 'Yes' : 'No'}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Simulate Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={clearUserData}>
        <Text style={styles.buttonText}>Clear User</Text>
      </TouchableOpacity>
    </View>
  );
}

// Example 3: Theme management
function ThemeExample() {
  const { theme, setTheme, isDark, isLight } = useTheme();
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Theme Hook (useTheme)</Text>
      <Text>Current Theme: {theme}</Text>
      <Text>Is Dark: {isDark ? 'Yes' : 'No'}</Text>
      <Text>Is Light: {isLight ? 'Yes' : 'No'}</Text>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isDark ? '#333' : '#007AFF' }]}
        onPress={() => setTheme(isDark ? 'light' : 'dark')}
      >
        <Text style={styles.buttonText}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Example 4: Settings management
function SettingsExample() {
  const { language, notifications, setLanguage, setNotifications } = useSettings();
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings Hook (useSettings)</Text>
      <Text>Language: {language}</Text>
      <Text>Notifications: {notifications ? 'Enabled' : 'Disabled'}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
      >
        <Text style={styles.buttonText}>Toggle Language</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setNotifications(!notifications)}
      >
        <Text style={styles.buttonText}>
          {notifications ? 'Disable' : 'Enable'} Notifications
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Example 5: Authentication
function AuthExample() {
  const { isAuthenticated, isLoggedIn, user, setAuthenticated, logout } = useAuth();
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Auth Hook (useAuth)</Text>
      <Text>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
      <Text>Logged In: {isLoggedIn ? 'Yes' : 'No'}</Text>
      <Text>User: {user?.name || 'None'}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setAuthenticated(!isAuthenticated)}
      >
        <Text style={styles.buttonText}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Full Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2d3436',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3436',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Usage examples in different scenarios:

/*
// 1. In a Login Screen
function LoginScreen() {
  const { setUserData, setAuthenticated } = useApp();
  
  const handleLogin = async (credentials) => {
    // Login logic...
    setUserData(userData);
    setAuthenticated(true);
  };
}

// 2. In a Settings Screen
function SettingsScreen() {
  const { setTheme, setLanguage, setNotifications } = useApp();
  
  return (
    <View>
      <ThemeSelector onThemeChange={setTheme} />
      <LanguageSelector onLanguageChange={setLanguage} />
      <NotificationToggle onToggle={setNotifications} />
    </View>
  );
}

// 3. In a Profile Screen
function ProfileScreen() {
  const { state, updateUserData } = useApp();
  
  const handleUpdateProfile = (updates) => {
    updateUserData(updates);
  };
  
  return (
    <View>
      <Text>{state.userData?.name}</Text>
      <Text>{state.userData?.email}</Text>
      {/* Profile form */}
    </View>
  );
}

// 4. In a Navigation Component
function NavigationComponent() {
  const { isAuthenticated } = useAuth();
  
  return (
    <View>
      {isAuthenticated ? <AuthenticatedNav /> : <GuestNav />}
    </View>
  );
}

// 5. In a Theme-aware Component
function ThemedComponent() {
  const { theme, isDark } = useTheme();
  
  return (
    <View style={{
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#000'
    }}>
      <Text>This component adapts to theme!</Text>
    </View>
  );
}
*/



