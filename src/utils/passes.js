import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'PASSES' 

export const pegaPasses = async () => {
    const json = await AsyncStorage.getItem(CHAVE)
    return json ? JSON.parse(json) : [] 
}

export const salvaPasses = async (passes) => {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(passes))
}

function adicionaDias(stringData, dias) {
  const data = new Date(stringData);
  data.setDate(data.getDate() + dias);
  return data.toISOString();
}

export const gerarCodigoPasse = (tipo) => {
    const prefixo = tipo.toUpperCase();
    const aleatorio = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `FLP-${prefixo}-${aleatorio}`;
};
    
export function criarCompraPasse(plano, titular) {
  const dataCompra = new Date().toISOString();
  const validade = adicionaDias(dataCompra, plano.validadeDias);

  return {
    id: `pass_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    codigo: gerarCodigoPasse(plano.id),
    nome: plano.nome,
    titular,
    preco: plano.preco,
    maxAtracoes: plano.quantidadeAtracoes,
    dataCompra,
    validade,
  };
}