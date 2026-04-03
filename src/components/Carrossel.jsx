import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { useRef, useEffect, useState } from "react";

const width = Dimensions.get("window").width;

export default function Carrossel({ 
  data = [],
  height = 250,
  autoPlay = true,
  intervalo = 3000 
}) {
    // Referência para controlar o ScrollView (necessário para autoplay)
  const scrollRef = useRef(null);

  const [index, setIndex] = useState(0);
//Cria um intervalo que roda a cada 3 segundos
useEffect(() => {
  if (!autoPlay || data.length === 0) return;

  const idIntervalo = setInterval(() => {
    setIndex((ultIndex) => {
      const proxIndex = (ultIndex + 1) % data.length;

      scrollRef.current?.scrollTo({
        x: proxIndex * width,
        animated: true,
      });

      return proxIndex;
    });
  }, intervalo);

  return () => clearInterval(idIntervalo);
}, [autoPlay, intervalo, data]);//reseta o intervalo

  return (
      <View style={{ width: width }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
      >
        {data.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.url }}
            resizeMode="cover"
            style={[
              styles.Imagem,
              { height } 
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
 Imagem: {
    width: width ,
    borderRadius: 20,
  },
});