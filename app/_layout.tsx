import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 1. Écran d'entrée : Login / Register fusionnés */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            // Empêche de revenir en arrière vers l'auth une fois connecté
            gestureEnabled: false,
          }}
        />

        {/* 2. Ton application principale (tes 4 onglets) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        {/* 3. Tes autres écrans comme le modal */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Détails" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
