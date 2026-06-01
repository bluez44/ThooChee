import { Stack } from "expo-router";
import { AppProvider } from "../store/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="details/[id]" options={{ presentation: "modal" }} />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
