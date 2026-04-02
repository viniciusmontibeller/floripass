import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { Link } from "expo-router";
import { useRef, useEffect, useState } from "react";

import images from "../../data/floripasse.json";

const width = Dimensions.get("window").width;

export default function Home() {
  const carouselData = images.carrosel.midiasDestaque;

  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % carouselData.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * (width * 0.9),
        animated: true,
      });

      setIndex(nextIndex);
    }, 3000); // troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [index]);

  return (
    <ImageBackground
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4SeKEI96Inzn74JQzmNqXvxiObi7UDBYiQ&s",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        
        <Text style={styles.description}>
          Explore as melhores atrações, descubra novos lugares e aproveite experiências incríveis com Floripass.
        </Text>

        {/* 🎠 CARROSSEL COM AUTOPLAY */}
        <View style={{ width: width * 0.9, height: 180 }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {carouselData.map((item) => (
              <Image
                key={item.id}
                source={{ uri: item.url }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.navigationArea}>
          <Link href="/ListaAtracoes" style={styles.link}>
            Ver Atrações
          </Link>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },

  image: {
    width: width * 0.9,
    height: 180,
    borderRadius: 12,
    marginRight: 10,
  },

  navigationArea: {
    marginTop: 20,
  },

  link: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});