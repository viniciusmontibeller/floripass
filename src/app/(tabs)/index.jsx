import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function Home() {

  const categorias = [
    { nome: "Praias", icon: "sunny-outline" },
    { nome: "Museus", icon: "business" },
    { nome: "Trilhas", icon: "leaf-outline" },
    { nome: "Cultura", icon: "color-palette-outline" },
  ];

  return (
    <ImageBackground
      source={{
        uri: "https://estado.sc.gov.br/noticias/wp-content/uploads/sites/3/2022/05/ponte_hercilio_luz_completa_96_anos_com_programacao_especial_20220512_1673447418.jpg",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay} edges={["top", "bottom"]}>

        <View>
          <Text style={styles.title}>Floripass</Text>

          <Text style={styles.description}>
            Explore as melhores atrações, descubra novos lugares e aproveite experiências incríveis.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categorias.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.category,
                  index === 0 && { marginLeft: 5 },
                  index === categorias.length - 1 && { marginRight: 20 },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />

                <Text style={styles.categoryText}>{item.nome}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.navigationArea}>
          <Link href="/listaAtracoes" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Explorar atrações</Text>
            </Pressable>
          </Link>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },

  description: {
    fontSize: 16,
    color: "#E2E8F0",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  categoriesContainer: {
    marginTop: 10,
  },

  categoriesContent: {
    paddingRight: 10,
  },

  category: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  navigationArea: {
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});