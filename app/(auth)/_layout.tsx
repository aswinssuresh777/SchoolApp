import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function AuthLayout() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectDetails = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);
      } catch (error) {
        console.log('Error fetching token:', error);
      } finally {
        setLoading(false);
      }
    };

    collectDetails();
  }, []);

  // While checking token, you can show a loader or nothing
  if (loading) return null;

  // If token exists, redirect to home
  if (token) {
    return <Redirect href="/(home)" />;
  }

  // Otherwise, show the auth stack (login/register)
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f6fa' },
        headerTintColor: '#2d3436',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Register', headerShown: true }}
      />
    </Stack>
  );
}
