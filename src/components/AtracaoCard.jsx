import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import FavoriteButton from './ui/FavoriteButton';
import { Link } from 'expo-router'

export default function AtracaoCard({ atracao, isFavorite, onToggleFavorite }) {
    const { id, nome, bairro, thumbnail } = atracao
    
    return (
        <View style={styles.contianer}>
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
                        <View style={styles.textArea}>
                            <Text style={styles.text}>{nome}</Text>
                            <Text style={styles.text}>{bairro}</Text>
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
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    textArea: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 15,
    },
    text: {
        color: 'white'
    }
})