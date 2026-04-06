export function formatarWhatsappParaLink (telefone) {
  let numero = telefone.replace(/\D/g, '');
  if (numero.length === 10 || numero.length === 11) {
    numero = `55${numero}`;
  }
  return numero;
};