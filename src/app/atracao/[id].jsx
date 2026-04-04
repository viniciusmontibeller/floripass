import { StyleSheet, Text, View, ScrollView, Image, Button, Linking, Pressable } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe';
import { getYoutubeVideoId } from '../../utils/getYoutubeVideoId'
import { Platform } from 'react-native'
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router'
import data from '../../../data/floripasse.json'
import Carrossel from "../../components/Carrossel";
import CustomButton from '../../components/ui/CustomButton';
import FavoriteButton from '../../components/ui/FavoriteButton';
import { useState } from 'react'


export default function AtracaoDetalhes() {
    const [favorito, setFavorito] = useState(false);
    const { id } = useLocalSearchParams();
    const atracao = data.atracoes.find((item) => String(item.id) == String(id));

    const { latitude, longitude } = atracao.localizacao
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
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{atracao.nome}</Text>

                    <FavoriteButton
                      isFavorite={favorito}
                        onPress={() => setFavorito(!favorito)}
                    />
                </View>

                <View style={styles.badgesRow}>
                    <View style={styles.badge}>
                        <Ionicons name="location-outline" size={14} color="#2563EB" />
                        <Text style={styles.badgeText}>{atracao.bairro}</Text>
                    </View>

                    {atracao.reserva.obrigatoria && (
                        <View style={[styles.badge, styles.badgeHighlight]}>
                            <Ionicons name="ticket-outline" size={14} color="#B45309" />
                            <Text style={[styles.badgeText, styles.badgeHighlightText]}>
                                Reserva obrigatória
                            </Text>
                        </View>
                    )}
                </View>

                <View style={[styles.gallery, styles.sectionSpacing]}>  
                    <Carrossel data={atracao.imagens} /> 
                </View>

                <View style={styles.card}>
                    <Text Text style={styles.sectionTitle}>Sobre</Text>
                    <Text style={styles.description}>{atracao.descricao}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Vídeos</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.gallery}
                        nestedScrollEnabled
                    >
                        {atracao.videos.map((videoUrl, index) => {
                            const videoId = getYoutubeVideoId(videoUrl)

                            return (
                                <View key={index} style={styles.videoWrapper} >
                                    <YoutubePlayer height={180} width={320} play={false} videoId={videoId} />
                                </View>
                            );
                        })}
                    </ScrollView>
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
                    <Text style={styles.sectionTitle}>Localização</Text>

                    <View style={styles.mapPreview}>
                        <Ionicons name="map" size={30} color="#2563EB" />
                        <Text style={styles.mapPreviewAddress}>
                        {atracao.endereco.enderecoCompleto} - {atracao.endereco.cep}
                        </Text>
                    </View>

                    <CustomButton
                        text={'Traçar rota'}
                        buttonStyle={styles.mapButton}
                        onPress={() => Linking.openURL(mapUrl)}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Contato</Text>

                    <Pressable
                        style={styles.contactRow}
                        onPress={() => Linking.openURL(`tel:${atracao.contato.telefone}`)}
                    >
                        <View style={styles.contactIcon}>
                            <Ionicons name="call-outline" size={18} color="#2563EB" />
                        </View>

                        <View style={styles.contactContent}>
                            <Text style={styles.contactLabel}>Telefone</Text>
                            <Text style={styles.contactValue}>{atracao.contato.telefone}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </Pressable>

                    <Pressable
                        style={styles.contactRow}
                        onPress={() => Linking.openURL(`mailto:${atracao.contato.email}`)}
                    >
                        <View style={styles.contactIcon}>
                            <Ionicons name="mail-outline" size={18} color="#2563EB" />
                        </View>

                        <View style={styles.contactContent}>
                            <Text style={styles.contactLabel}>E-mail</Text>
                            <Text style={styles.contactValue}>{atracao.contato.email}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </Pressable>

                    {atracao.contato.whatsapp &&
                        <Pressable
                            style={styles.contactRow}
                            onPress={() => Linking.openURL(`https://wa.me/${atracao.contato.whatsapp}`)}
                        >
                            <View style={styles.contactIcon}>
                                <Ionicons name="logo-whatsapp" size={18} color="#2563EB" />
                            </View>

                            <View style={styles.contactContent}>
                                <Text style={styles.contactLabel}>WhatsApp</Text>
                                <Text style={styles.contactValue}>{atracao.contato.whatsapp}</Text>
                            </View>

                            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                        </Pressable>
                    }
                </View>

                <View style={styles.actionsContainer}>
                    <CustomButton text={'Realizar reserva'} type='primary'/>
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
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    badgeHighlight: {
        backgroundColor: '#DBEAFE',
    },
    badgeText: {
        marginLeft: 6,
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
    mapPreview: {
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginBottom: 12,
    },
    mapPreviewTitle: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    mapPreviewAddress: {
        marginTop: 6,
        fontSize: 13,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 20,
    },
    mapButton: {
        backgroundColor: '#2563EB',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    mapButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    contactRowLast: {
        borderBottomWidth: 0,
    },
    contactIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactContent: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    contactValue: {
        fontSize: 14,
        color: '#475569',
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
        aspectRatio: 16 / 9,
        width: '100%',
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
    }
})