import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="ListaAtracoes" options={{ title: "Atrações" }} />
      <Stack.Screen name="atracao/[id]" options={{ title: 'Detalhes da Atração', headerShown: false  }} />
    </Stack>
  );
}
