import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import FavoriteButton from './ui/FavoriteButton';
import { Link } from 'expo-router'

export default function AtracaoCard({ atracao, isFavorite, onToggleFavorite }) {
    const { id, nome, bairro, thumbnail } = atracao
    
    return (
        <View style={styles.container}>
            <Link
                asChild
                href={`/atracao/${id}`}
            >
                <Pressable style={styles.card}>
                    <ImageBackground
                        source={{ uri: thumbnail }}
                        style={{
                            height: 180,
                            width: '100%',
                            justifyContent: 'flex-end',
                            position: 'relative'
                        }}
                    >
                        <View style={styles.overlay}>
                            <Text style={styles.title} numberOfLines={2}>
                                {nome}
                            </Text>
                            <View style={styles.bairroBadge}>
                                <Text style={styles.bairroBadgeText}>{bairro}</Text>
                            </View>
                        </View>
                        
                        <FavoriteButton
                            isFavorite={isFavorite}
                            style={{position: 'absolute', top: 0, right: 0, margin: 10}}
                            onPress={onToggleFavorite}
                        />
                    </ImageBackground>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },  
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    text: {
        color: 'white'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 15,
    },
    bairroBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },
    bairroBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        lineHeight: 22,
        marginBottom: 4,
    },
})