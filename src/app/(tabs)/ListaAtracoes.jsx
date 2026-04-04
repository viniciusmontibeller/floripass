import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native'
import { useState } from 'react'
import AtracaoCard from '../../components/AtracaoCard'
import data from '../../../data/floripasse.json'

export default function ListaAtracoes() {
  // const [loading, setLoading] = useState()

  return (
    <View style = {{flex: 1}}>
      <FlatList
        style={styles.container}
        data={data.atracoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AtracaoCard atracao={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({})