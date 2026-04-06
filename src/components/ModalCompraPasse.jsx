import { Modal, ScrollView, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import CustomButton from '../components/ui/CustomButton'
import { useEffect, useMemo, useState } from 'react';

export default function ModalCompraPasse({ visivel, passeSelecionado, fecharModal, confirmar}) {
    const [quantidade, setQuantidade] = useState(1)
    const [donos, setDonos] = useState([''])

    useEffect(() => {
        if (visivel) {
            setQuantidade(1);
            setDonos(['']);
        }
    }, [visivel, passeSelecionado]);

    if (!passeSelecionado) return null;

    const total = useMemo(() => {
        if (!passeSelecionado) return 0;
            return passeSelecionado.preco * quantidade;
    }, [passeSelecionado, quantidade]);

    function aumentaQuantidade() {
        const novaQuantidade = quantidade + 1;
        setQuantidade(novaQuantidade);
        setDonos((prev) => [...prev, '']);
    }

    function diminuiQuantidade() {
        if (quantidade === 1) return;

        const novaQuantidade = quantidade - 1;
        setQuantidade(novaQuantidade);
        setDonos((prev) => prev.slice(0, -1));
    }

    function atualizaNomeDono(index, value) {
        setDonos((prev) => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    }

    function lidaComConfirmar() {
        const donosFormatados = donos.map((name) => name.trim());

        const nomeEmBranco = donosFormatados.some((name) => !name);
        if (nomeEmBranco) {
            return;
        }

        confirmar({
            quantidade,
            nomesDonos: donosFormatados,
        });
    }

  return (
    <Modal
        visible={visivel}
        transparent
        animationType="slide"
        onRequestClose={fecharModal}
    >
        <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}
            >
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Comprar Passe {passeSelecionado.nome}</Text>
                    <Text style={styles.modalSubtitle}>
                        {passeSelecionado.quantidadeAtracoes} atrações • {passeSelecionado.validadeDias} dias
                    </Text>

                    <Text style={styles.inputLabel}>Quantidade</Text>

                    <View style={styles.quantityRow}>
                        <Pressable style={styles.quantityButton} onPress={diminuiQuantidade}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </Pressable>
                        
                        <Text style={styles.quantityValue}>{quantidade}</Text>

                        <Pressable style={styles.quantityButton} onPress={aumentaQuantidade}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>
                    </View>
                        
                    <Text style={styles.inputLabel}>Titulares dos passes</Text>

                    <ScrollView
                        style={styles.holdersList}
                        contentContainerStyle={styles.holdersContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {donos.map((dono, index) => (
                            <View key={index} style={styles.inputBlock}>
                                <Text style={styles.inputLabel}>Titular {index + 1}</Text>
                                <TextInput
                                value={dono}
                                onChangeText={(value) => atualizaNomeDono(index, value)}
                                placeholder="Digite o nome do titular"
                                placeholderTextColor="#CBD5E1"
                                style={styles.input}
                                />
                            </View>
                        ))}
                    </ScrollView>
                        
                    
                    <View style={styles.summaryBox}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Valor unitário</Text>
                            <Text style={styles.summaryValue}>R${passeSelecionado.preco}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Quantidade</Text>
                            <Text style={styles.summaryValue}>{quantidade}</Text>
                        </View>

                        <View style={[styles.summaryRow, styles.summaryRowTotal]}>
                            <Text style={styles.summaryTotalLabel}>Total</Text>
                            <Text style={styles.summaryTotalValue}>R${total}</Text>
                        </View>
                    </View>

                    <View style={styles.modalActions}>
                        <CustomButton
                            text="Cancelar"
                            type='secondary'
                            buttonStyle={styles.cancelButton}
                            textStyle={styles.cancelButtonText}
                            onPress={fecharModal}
                        />
                        <CustomButton
                            text="Confirmar compra"
                            type='prymary'
                            buttonStyle={styles.confirmButton}
                            textStyle={styles.confirmButtonText}
                            onPress={lidaComConfirmar}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 18,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 18,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 15,
        color: '#0F172A',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    quantityButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2563EB',
    },
    quantityValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginHorizontal: 20,
    },
    holdersList: {
        maxHeight: 240,
        marginBottom: 16,
    },
    holdersContent: {
        paddingBottom: 4,
    },
    inputBlock: {
        marginBottom: 12,
    },
    summaryBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 14,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryRowTotal: {
        marginTop: 6,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    summaryTotalLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    summaryTotalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#2563EB',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 10,
    },
    cancelButton: {
        flex: 1,
        height: 50,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontWeight: '700',
    },
    confirmButton: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontWeight: '700',
    },
})