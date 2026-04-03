import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";


const width = Dimensions.get("window").width;

export default function Home() {

  return (
    <ImageBackground
      source={{
        uri: "https://estado.sc.gov.br/noticias/wp-content/uploads/sites/3/2022/05/ponte_hercilio_luz_completa_96_anos_com_programacao_especial_20220512_1673447418.jpg",
      }}
      style={styles.container}
      resizeMode="cover"
    >
       <SafeAreaView style={styles.overlay} edges={["top", "bottom"]}>

        
        <Text style={styles.description}>
          Explore as melhores atrações, descubra novos lugares e aproveite experiências incríveis com Floripass.
        </Text>


      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    justifyContent: "space-between", 
    paddingBottom: 30,
    overflow: "hidden"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginVertical: 10,
  },
  carouselContainer: {
    height: 200,
    alignSelf: "center",
  },

  image: {
    width: width * 1,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
  },
  navigationArea: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200ee",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontSize: 16,
    fontWeight: "bold",
    overflow: "hidden",
  },
  link: {
    color: 'white',
  }
});