import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AtracaoCard from '../../components/AtracaoCard'
import data from '../../../data/floripasse.json'

export default function ListaAtracoes() {
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <View>
        <FlatList
          style={styles.container}
          data={data.atracoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AtracaoCard atracao={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})