import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'FAVORITOS' 


export const pegaFavoritos = async () => {
    const json = await AsyncStorage.getItem(CHAVE)
    return json ? JSON.parse(json) : [] 
} //busca os fav salvos, se existe converte para array, se não return null

export const salvaFavoritos = async (favoritos) => {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(favoritos))
}
//array para string e salva no assync

export const hablitarFavoritos = async (id) => {
     const favoritos = await pegaFavoritos()
//verifica se ja esta nos favs

    let novos
    if (favoritos.includes(id)) {
        novos = favoritos.filter((fav) => fav !== id) // se ja existe remove
    } else {
        novos = [...favoritos, id] // se não remove
    }
    //salva a lista att
    await salvaFavoritos(novos)
    return novos
}