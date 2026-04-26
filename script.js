const WHATSAPP_NUMBER = '5511991097648';

const $ = (id) => document.getElementById(id);

const getCheckedFlavors = () => {
  const checks = document.querySelectorAll('.checks input[type="checkbox"]:checked');
  return Array.from(checks).map((check) => check.value);
};

const intOrZero = (value) => Number.parseInt(value, 10) || 0;

const pushIfValue = (label, value, list) => {
  if (value && String(value).trim()) list.push(`• ${label}: ${value}`);
};

const buildMessage = () => {
  const nome = $('nome').value.trim();
  const telefone = $('telefone').value.trim();
  const pagamento = $('pagamento').value;
  const entrega = $('entrega').value;
  const endereco = $('endereco').value.trim();
  const obs = $('obs').value.trim();

  const itens = [];
  pushIfValue('Salgados Fritos', $('comboFritos').value, itens);
  pushIfValue('Salgados Congelados', $('comboCongelados').value, itens);
  pushIfValue('Mini Churros', $('comboChurros').value, itens);
  pushIfValue('Assados/Bolinho Caipira', $('comboAssados').value, itens);

  const qtdPersonalizada = intOrZero($('qtdPersonalizada').value);
  const nhoqueTrad = intOrZero($('nhoqueTrad').value);
  const nhoquePQ = intOrZero($('nhoquePQ').value);
  const nhoqueQ = intOrZero($('nhoqueQ').value);

  if (qtdPersonalizada > 0) itens.push(`• Salgados personalizados: ${qtdPersonalizada} unidades`);
  if (nhoqueTrad > 0) itens.push(`• Nhoque Tradicional 500g: ${nhoqueTrad} un.`);
  if (nhoquePQ > 0) itens.push(`• Nhoque Presunto e Queijo 500g: ${nhoquePQ} un.`);
  if (nhoqueQ > 0) itens.push(`• Nhoque Queijo 500g: ${nhoqueQ} un.`);

  const sabores = getCheckedFlavors();

  if (!nome || itens.length === 0) {
    alert('Informe seu nome e selecione pelo menos 1 item do pedido.');
    return null;
  }

  return [
    'Olá! Quero concluir meu pedido na C & C Salgados e Doces. 🍟🍬',
    '',
    '*Cliente*',
    `• Nome: ${nome}`,
    `• Telefone: ${telefone || 'Não informado'}`,
    `• Pagamento: ${pagamento}`,
    `• Entrega: ${entrega}`,
    `• Endereço: ${endereco || 'Não informado'}`,
    '',
    '*Itens*',
    ...itens,
    '',
    '*Sabores escolhidos*',
    sabores.length ? `• ${sabores.join(', ')}` : '• Não informado',
    '',
    '*Observações*',
    obs || '• Sem observações',
    '',
    '✅ Preferência: salgado de festa de 20g.',
    '📌 Consultar taxa de entrega e confirmar preços atualizados.'
  ].join('\n');
};

$('enviarPedido').addEventListener('click', () => {
  const message = buildMessage();
  if (!message) return;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});
