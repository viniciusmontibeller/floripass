import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function AtracaoCard({ atracao }) {
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
                        }}
                    >
                        <View style={styles.textArea}>
                            <Text style={styles.text}>{nome}</Text>
                            <Text style={styles.text}>{bairro}</Text>
                        </View>
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