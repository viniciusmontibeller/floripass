import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopWidth: 0, //tira divisão
          height: 80,
          paddingBottom: 12,
          paddingTop: 10,
        },

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#64748B",

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "700",
          letterSpacing: 0.5,
        },
        tabBarItemStyle: {
          borderRadius: 10,
        },
}}

      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="listaAtracoes"
        options={{
          title: "Atrações",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
      name="favoritos"
      options={{
        title: "Favoritos",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
              name={focused ? "star" : "star-outline"}
              size={size}
              color={color}
            />
          ),
      }}
      />
      
        <Tabs.Screen
        name="passes"
        options={{
          title: "Passes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
                name={focused ? "ticket" : "ticket-outline"}
                size={size}
                color={color}
              />
            ),
        }}
      />
    </Tabs>
  );
}