import { Tabs } from "expo-router";

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
        }}
      />

      <Tabs.Screen
        name="ListaAtracoes"
        options={{
          title: "Atrações",
        }}
      />
      <Tabs.Screen
      name="Favoritos"
      options={{
        title: "Favoritos",
      }}
    />
    </Tabs>
  );
}