import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import data from '../../../data/floripasse.json'
import CustomButton from '../../components/ui/CustomButton';
import ModalCompraPasse from '../../components/ModalCompraPasse';
import { pegaPasses, criarCompraPasse, salvaPasses } from '../../utils/passes'
import { useEffect, useState } from 'react'

export default function Passes() {
    const opcoesPasses = data.passes
    const [passesAdquiridos, setPassesAdquiridos] = useState([])
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);

    useEffect(() => {
        const carregar = async () => {
            const passes = await pegaPasses(); 
            setPassesAdquiridos(passes);
        };
        carregar();
    }, [])

    
    function abrirCompraModal(plano) {
        setPlanoSelecionado(plano);
        setModalVisivel(true);
    }

    function fecharCompraModal() {
        setModalVisivel(false);
        setPlanoSelecionado(null);
    }

    async function confirmarCompra({ nomesDonos }) {
        const novosPasses = nomesDonos.map((nomeDono) =>
            criarCompraPasse(planoSelecionado, nomeDono)
        );

        const passesAtualizados = [...novosPasses, ...passesAdquiridos];

        await salvaPasses(passesAtualizados);
        setPassesAdquiridos(passesAtualizados);

        fecharCompraModal();
    }

    return (
      <>
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.pageTitle}>Passes</Text>

            <Text style={[styles.sectionTitle, styles.sectionSpacing]}>
                Comprar novo passe
            </Text>


            {opcoesPasses.map((passe) => (
                <View
                    key={passe.id}
                    style={[
                        styles.buyCard,
                        passe.destaque && styles.buyCardHighlight,
                    ]}
                >
                    <View style={styles.buyTopRow}>
                        <View>
                            <Text style={styles.buyPassName}>Passe {passe.nome}</Text>
                            <Text style={styles.buyPrice}>R$ {passe.preco}</Text>
                        </View>

                        {passe.destaque && (
                            <View style={styles.recommendedBadge}>
                                <Text style={styles.recommendedBadgeText}>Mais popular</Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.buyDescription}>
                        Inclui ingresso em até {passe.quantidadeAtracoes} atrações • válido por {passe.validadeDias} dias corridos
                    </Text>

                    <View style={styles.buyInfoRow}>
                        <View style={styles.buyInfoBox}>
                            <Ionicons name="ticket-outline" size={18} color="#2563EB"  style={styles.buyInfoIcon} />
                            <Text style={styles.buyInfoValue}>{passe.quantidadeAtracoes}</Text>
                            <Text style={styles.buyInfoLabel}>atrações</Text>
                        </View>

                        <View style={styles.buyInfoBox}>
                            <Ionicons name="calendar-outline" size={18} color="#2563EB" style={styles.buyInfoIcon} />
                            <Text style={styles.buyInfoValue}>{passe.validadeDias}</Text>
                            <Text style={styles.buyInfoLabel}>dias</Text>
                        </View>

                    </View>

                    <CustomButton
                        text='Comprar'
                        type='primary'
                        onPress={() => abrirCompraModal(passe)} />
                </View>
            ))}
            
            <Text style={[styles.sectionTitle, styles.sectionSpacing]}>
                Passes comprados
            </Text>
            
            {passesAdquiridos.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>Nenhum passe comprado ainda</Text>
                    <Text style={styles.emptyText}>
                        Depois da compra, seus passes aparecerão aqui.
                    </Text>
                </View>
            ):
                (passesAdquiridos.map((passe) => {
                    const ativo = new Date(passe.validade) > new Date();
                    return (
                    <View
                        key={passe.id}
                        style={[
                            styles.myPassCard,
                            ativo ? styles.myPassCardActive : styles.myPassCardExpired,
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.passName}>Passe {passe.nome}</Text>
                                <Text style={styles.passHolder}>Titular: {passe.titular}</Text>
                            </View>

                            <View
                                style={[
                                styles.statusBadge,
                                ativo ? styles.statusBadgeActive : styles.statusBadgeExpired,
                                ]}
                            >
                                <Text
                                style={[
                                    styles.statusBadgeText,
                                    ativo
                                    ? styles.statusBadgeTextActive
                                    : styles.statusBadgeTextExpired,
                                ]}
                                >
                                {ativo ? 'Ativo' : 'Expirado'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.codeBox}>
                                <Text style={styles.codeLabel}>Código do passe</Text>
                                <Text style={styles.codeValue}>{passe.codigo}</Text>
                        </View>
                        
                        <View style={styles.purchasedInfoFooter}>        
                            <Text style={styles.purchasedInfo}>
                                {passe.maxAtracoes} atrações
                            </Text>

                            <Text style={styles.purchasedInfo}>
                                Válido até {new Date(passe.validade).toLocaleDateString('pt-BR')}
                            </Text>
                        </View>
                    </View>
                );
            }))}
        </ScrollView>
        <ModalCompraPasse
            visivel={modalVisivel}
            passeSelecionado={planoSelecionado}
            fecharModal={fecharCompraModal}
            confirmar={confirmarCompra}
        />
    </>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 14,
    },
    sectionSpacing: {
        marginTop: 8,
    },
    myPassCard: {
        borderRadius: 22,
        padding: 18,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    myPassCardActive: {
        backgroundColor: '#DBEAFE',
    },
    myPassCardExpired: {
        backgroundColor: '#FFFFFF',
        opacity: 0.92,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    passName: {
        fontSize: 19,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    passHolder: {
        fontSize: 14,
        color: '#475569',
    },
    statusBadge: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statusBadgeActive: {
        backgroundColor: '#DCFCE7',
    },
    statusBadgeExpired: {
        backgroundColor: '#E2E8F0',
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    statusBadgeTextActive: {
        color: '#166534',
    },
    statusBadgeTextExpired: {
        color: '#475569',
    },
    buyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    buyCardHighlight: {
        borderWidth: 1,
        borderColor: '#87a9f1',
    },
    buyTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    buyDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#64748B',
        marginBottom: 14,
    },
    buyPassName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    buyPrice: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2563EB',
    },
    recommendedBadge: {
        backgroundColor: '#EFF6FF',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    recommendedBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1D4ED8',
    },
    buyInfoRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    buyInfoBox: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    buyInfoValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 2,
        marginBottom: 2,
        textAlign: 'center',
    },
    buyInfoLabel: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
    },
    buyInfoIcon: {
        marginBottom: 4,
    },
    codeBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
    },
    codeLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 4,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 0.6,
    },
    purchasedInfo: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 4,
    },
    purchasedInfoFooter: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    emptyText: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 21,
    },
})