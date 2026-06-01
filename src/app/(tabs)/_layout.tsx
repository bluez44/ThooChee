import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Home, ListFilter, Mic, BarChart3, User2 } from "lucide-react-native";
import tw from "../../theme/tailwind";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0058bc",
        tabBarInactiveTintColor: "#717786",
        tabBarLabelStyle: tw`text-[11px] font-medium pb-1`,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 20,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.4)",
          shadowColor: "#1a1b1f",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size - 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Ledger",
          tabBarIcon: ({ color, size }) => (
            <ListFilter color={color} size={size - 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          title: "Voice",
          tabBarIcon: ({ color, size }) => (
            <View style={tw`bg-primary rounded-full p-2.5 -top-4 shadow-md shadow-primary/20 border-4 border-background`}>
              <Mic color="#ffffff" size={size} />
            </View>
          ),
          tabBarLabelStyle: tw`text-[11px] font-medium pb-1 mt-1`,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size - 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User2 color={color} size={size - 2} />
          ),
        }}
      />
    </Tabs>
  );
}
