import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="analyze-mistakes" />
      <Stack.Screen name="study" />
      <Stack.Screen name="take-test" />
      <Stack.Screen name="unitTopicsScreen" />
      <Stack.Screen name="AssesmentUnitScreen" />
      <Stack.Screen name="AssesmentScreen" />
      {/* <Stack.Screen name="take-test" /> */}
    </Stack>
  );
}
