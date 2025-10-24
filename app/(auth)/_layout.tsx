import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f6fa',
        },
        headerTintColor: '#2d3436',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
    </Stack>
  );
}