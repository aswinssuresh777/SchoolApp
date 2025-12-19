import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, View } from "react-native";
import { AppProvider } from "../context/UserContext";
import { AppAlertProvider } from "../components/AppAlert";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle hardware back press
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (router.canGoBack()) {
            router.back();
          } else {
            Alert.alert("Exit App", "Do you want to exit the app?", [
              { text: "Cancel", style: "cancel" },
              { text: "Exit", onPress: () => BackHandler.exitApp() },
            ]);
          }
          return true;
        }
      );
      return () => subscription.remove();
    }, [router])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppAlertProvider>
      <AppProvider>
      {/* <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(home)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
         <Stack.Screen name="screens" options={{ headerShown: false }} />
      </Stack> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          redirect={!isLoading && !router ? false : true}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="screens" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </AppProvider>
    </AppAlertProvider>
  );
}
