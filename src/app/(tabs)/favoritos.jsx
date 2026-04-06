import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from '../../../data/floripasse.json';
import { pegaFavoritos } from '../../utils/favoritos';
import AtracaoCard from '../../components/AtracaoCard';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => { //carrega os fav
        const ids = await pegaFavoritos(); 

        //filtra para pegar apenas as favs
        const lista = data.atracoes.filter((item) =>
          ids.includes(item.id)
        );

        setFavoritos(lista); //att
      };

      carregar();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      {favoritos.length === 0 ? (
        <Text style={{ textAlign: 'center'}}>
          Você ainda não adicionou atrações à sua lista
        </Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => <AtracaoCard atracao={item} />}
        />
      )}
    </SafeAreaView>
  );
}