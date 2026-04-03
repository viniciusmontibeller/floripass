import {
  View,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import { useRef, useEffect, useState } from "react";


export default function Carrossel({ 
  data = [],
  height = 250,
  autoPlay = true,
  intervalo = 3000 
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  // Referência para controlar o ScrollView (necessário para autoplay)
  const scrollRef = useRef(null);

  const [index, setIndex] = useState(0);

//Cria um intervalo que roda a cada 3 segundos
useEffect(() => {
  if (!autoPlay || data.length === 0 || containerWidth === 0) return;

  const idIntervalo = setInterval(() => {
    setIndex((ultIndex) => {
      const proxIndex = (ultIndex + 1) % data.length;
//move o scroll para a próxima imagem
      scrollRef.current?.scrollTo({
        x: proxIndex * containerWidth,
        animated: true,
      });

      return proxIndex;
    });
  }, intervalo);

  return () => clearInterval(idIntervalo);
}, [autoPlay, intervalo, data, containerWidth]);//reseta o intervalo

  return (
        <View
      style={{ width: "100%" }}
      //captura largura (centraizar em todos cell)
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width); 
      }}
    >

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
          <View key={item.id} style={[styles.slide, { width: containerWidth }]}> //cada imagem ocupa 1
            <Image
              source={{ uri: item.url }}
              resizeMode="cover"
              style={[
                styles.Imagem,
                { height }
              ]}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
slide: {
  alignItems: "center",
},

Imagem: {
  width: "90%",
  borderRadius: 20, 
},
})