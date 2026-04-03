import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs vira a navegação principal */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Tela de detalhe */}
      <Stack.Screen 
        name="atracao/[id]" 
        options={{ title: "Detalhes da Atração" }} 
      />
    </Stack>
  );
}