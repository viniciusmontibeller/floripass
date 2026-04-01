import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import data from '../../../data/floripasse.json'

export default function AtracaoDetalhes() {
    const { id } = useLocalSearchParams();

    const atracao = data.atracoes.find((item) => String(item.id) == String(id));

    return (
        <ScrollView>
            <Text>{atracao.nome}</Text>
            {/* <Image source={{ uri: atracao.imagens[0] }}/> */}
            {/* <Image source={{ uri: atracao.imagens[1] }}/> */}
            {/* <Image source={{ uri: atracao.videos[0] }}/>  ????????????*/}
            <Text>{atracao.descricao}</Text>
            {atracao.horariosFuncionamento.map((horario, index) => (
                <Text key={index}>
                    {horario.dias.join(', ')} - {horario.abre} às {horario.fecha}
                </Text>
            ))}
            <Text>Endereço: {atracao.endereco.enderecoCompleto} - {atracao.endereco.cep}</Text>
            <Text>Email - {atracao.contato.email} </Text>
            <Text>Contato - {atracao.contato.telefone} </Text>
            { atracao.reserva.obrigatoria && <Button title='Realizar reserva' /> }
            <Button title='Adicionar como favorito' />
        </ScrollView>
    );
}

const styles = StyleSheet.create({})