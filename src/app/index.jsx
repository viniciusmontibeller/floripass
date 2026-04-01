import { Text, View, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <View>
        <Link href="/ListaAtracoes" >Atrações</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})