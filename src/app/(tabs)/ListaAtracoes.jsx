import { StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { pegaFavoritos, hablitarFavoritos } from '../../utils/favoritos';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import AtracaoCard from '../../components/AtracaoCard'
import data from '../../../data/floripasse.json'

export default function ListaAtracoes() {
    const [favoritos, setFavoritos] = useState([]);

    useFocusEffect(
        useCallback(() => {
          const carregar = async () => {
            const ids = await pegaFavoritos();
            setFavoritos(ids);
          };

          carregar();
        }, [])
      );
    
  const atracoesOrdenadas = [...data.atracoes].sort((a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR')
  );

  async function toggleFavorito(id) {
    const novosIds = await hablitarFavoritos(id);
    setFavoritos(novosIds);
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <View>
        <FlatList
          style={styles.container}
          data={atracoesOrdenadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AtracaoCard atracao={item} isFavorite={favoritos.includes(item.id)} onToggleFavorite={() => toggleFavorito(item.id)}/>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})