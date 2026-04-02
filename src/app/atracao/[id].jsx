import { StyleSheet, Text, View, ScrollView, Image, Button, Linking } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe';
import { Platform } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import data from '../../../data/floripasse.json'

function getYoutubeVideoId(url) {
    try {
        const parsed = new URL(url);

        // youtu.be/VIDEO_ID
        if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.split('/').filter(Boolean)[0] ?? null;
        }

        // youtube.com/shorts/VIDEO_ID
        if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] ?? null;
        }

        // youtube.com/embed/VIDEO_ID
        if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] ?? null;
        }

        // youtube.com/watch?v=VIDEO_ID
        return parsed.searchParams.get('v');
    } catch {
        return null;
    }
}


export default function AtracaoDetalhes() {
    const { id } = useLocalSearchParams();
    const atracao = data.atracoes.find((item) => String(item.id) == String(id));

    const { latitude, longitude } = atracao.localizacao

    const youtubeUrl = atracao.videos[0];
    const videoId = getYoutubeVideoId(youtubeUrl);

    const mapUrl = Platform.select({
        ios: `maps:0,0?q=${latitude}, ${longitude}`,
        android: `geo:0,0?q=${latitude}, ${longitude}`,
    });

    return (
        <ScrollView>
            <Text>{atracao.nome}</Text>
            <Image source={{ uri: atracao.imagens[0] }} style={styles.image} />
            <Image source={{ uri: atracao.imagens[1] }} style={styles.image} />
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={220}
                    play={false}
                    videoId={videoId}
                />
            </View>
            <Text>{atracao.descricao}</Text>
            {atracao.horariosFuncionamento.map((horario, index) => (
                <Text key={index}>
                    {horario.dias.join(', ')} - {horario.abre} às {horario.fecha}
                </Text>
            ))}
            <Text>Endereço: {atracao.endereco.enderecoCompleto} - {atracao.endereco.cep}</Text>
            {atracao.contato.email && <Text>Email: {atracao.contato.email} </Text>}
            {atracao.contato.email && <Text>Contato: {atracao.contato.telefone} </Text>}
            {atracao.reserva.obrigatoria && <Button title='Realizar reserva' />}
            <View >
                <Button onPress={() => Linking.openURL(`tel:${atracao.contato.telefone}`) }
                title="Ligar" />
            </View>
            <View >
                <Button onPress={() => Linking.openURL(mapUrl) }
                title="Localização" />
            </View>
            <Button title='Adicionar como favorito' />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 180,
        width: '100%',
    }
})