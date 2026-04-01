import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function AtracaoCard({ atracao }) {
    const { id, nome, bairro, thumbnail } = atracao

    return (
        <View>
            <Link
                asChild
                href={`/atracao/${id}`}
            >
                <Pressable>
                    <ImageBackground
                        source={{ uri: thumbnail }}
                        style={{
                            height: 180,
                            width: '100%',
                            justifyContent: 'flex-end',
                            padding: 12,
                        }}
                    >
                        <Text>{nome}</Text>
                        <Text>{bairro}</Text>
                    </ImageBackground>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({})