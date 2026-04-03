import { StyleSheet, Text, View, ScrollView, Image, Button, Linking, Pressable } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe';
import { getYoutubeVideoId } from '../../utils/getYoutubeVideoId'
import { Platform } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import data from '../../../data/floripasse.json'
import Carrossel from "../../components/Carrossel";

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
        <>
            <Stack.Screen
                options={{
                title: atracao.nome,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#F8FAFC' },
                headerTitleStyle: { fontWeight: '700' },
                }}
            />
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{atracao.nome}</Text>

                <View style={styles.badgesRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{atracao.bairro}</Text>
                    </View>

                    <View style={[styles.badge, styles.badgeHighlight]}>
                        <Text style={[styles.badgeText, styles.badgeHighlightText]}>
                            Reserva obrigatória
                        </Text>
                    </View>
                </View>

                <Carrossel data={atracao.imagens} /> 


                <View style={styles.card}>
                    <Text Text style={styles.sectionTitle}>Sobre a atração</Text>
                    <Text style={styles.description}>{atracao.descricao}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Vídeos</Text>
                    <View style={styles.videoWrapper}>
                        <YoutubePlayer height={220} play={false} videoId={videoId} />
                    </View>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Funcionamento</Text>
                    {atracao.horariosFuncionamento.map((horario, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.infoLabel}>
                            {horario.dias.join(', ')}
                            </Text>
                            <Text style={styles.infoValue}>
                            {horario.abre} às {horario.fecha}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Contato e localização</Text>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoBlockLabel}>Endereço</Text>
                        <Text style={styles.infoBlockText}>
                        {atracao.endereco.enderecoCompleto} - {atracao.endereco.cep}
                        </Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoBlockLabel}>E-mail</Text>
                        <Text style={styles.infoBlockText}>{atracao.contato.email}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoBlockLabel}>Telefone</Text>
                        <Text style={styles.infoBlockText}>{atracao.contato.telefone}</Text>
                    </View>

                </View>

                <View style={styles.actionsContainer}>
                    <Pressable style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Realizar reserva</Text>
                    </Pressable>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => Linking.openURL(`tel:${atracao.contato.telefone}`)}
                        >
                        <Text style={styles.secondaryButtonText}>Ligar</Text>
                    </Pressable>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => Linking.openURL(`mailto:${atracao.contato.email}`)}
                        >
                        <Text style={styles.secondaryButtonText}>Enviar e-mail</Text>
                    </Pressable>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => Linking.openURL(mapUrl)}
                    >
                        <Text style={styles.secondaryButtonText}>Ver localização</Text>
                    </Pressable>

                    <Pressable style={styles.favoriteButton}>
                        <Text style={styles.favoriteButtonText}>Adicionar aos favoritos</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    content: {
            padding: 16,
            paddingBottom: 32,
    },
    centered: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F1F5F9',
            padding: 24,
    },
    title: {
            fontSize: 28,
            fontWeight: '800',
            color: '#0F172A',
            marginBottom: 12,
    },
    badgesRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 18,
    },
    badge: {
            backgroundColor: '#E2E8F0',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999,
    },
    badgeHighlight: {
            backgroundColor: '#DBEAFE',
    },
    badgeText: {
            fontSize: 12,
            fontWeight: '600',
            color: '#334155',
    },
    badgeHighlightText: {
        color: '#1D4ED8',
    },
    gallery: {
        gap: 12,
        paddingBottom: 6,
        marginBottom: 18,
    },
    galleryImage: {
        width: 280,
        height: 190,
        borderRadius: 18,
        backgroundColor: '#CBD5E1',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 12,
    },
    videoWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#334155',
    },
    infoRow: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBlockColor: '#E2E8F0',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
    infoBlock: {
        marginBottom: 14,
    },
    infoBlockLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    infoBlockText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
    },
    actionsContainer: {
        marginTop: 4,
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#0284C7',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    secondaryButtonText: {
        color: '#0F172A',
        fontSize: 15,
        fontWeight: '600',
    },
    favoriteButton: {
        backgroundColor: '#0F172A',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
})