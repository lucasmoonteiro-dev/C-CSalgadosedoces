const WHATSAPP_NUMBER = '5511991097648';

const fields = {
  nome: document.getElementById('nome'),
  telefone: document.getElementById('telefone'),
  pagamento: document.getElementById('pagamento'),
  entrega: document.getElementById('entrega'),
  qtdFritos: document.getElementById('qtdFritos'),
  qtdCongelados: document.getElementById('qtdCongelados'),
  qtdChurros: document.getElementById('qtdChurros'),
  qtdAssados: document.getElementById('qtdAssados'),
  qtdNhoqueTrad: document.getElementById('qtdNhoqueTrad'),
  qtdNhoquePQ: document.getElementById('qtdNhoquePQ'),
  qtdNhoqueQ: document.getElementById('qtdNhoqueQ'),
  qtdPersonalizada: document.getElementById('qtdPersonalizada'),
  endereco: document.getElementById('endereco'),
  obs: document.getElementById('obs')
};

const toInt = (value) => Number.parseInt(value, 10) || 0;

const buildOrderLines = () => {
  const lines = [];

  const products = [
    ['Salgados Fritos (unidades)', toInt(fields.qtdFritos.value)],
    ['Salgados Congelados (unidades)', toInt(fields.qtdCongelados.value)],
    ['Mini Churros (unidades)', toInt(fields.qtdChurros.value)],
    ['Assados/Bolinho Caipira (unidades)', toInt(fields.qtdAssados.value)],
    ['Nhoque Tradicional 500g', toInt(fields.qtdNhoqueTrad.value)],
    ['Nhoque Presunto e Queijo 500g', toInt(fields.qtdNhoquePQ.value)],
    ['Nhoque Queijo 500g', toInt(fields.qtdNhoqueQ.value)],
    ['Salgados personalizados (unidades)', toInt(fields.qtdPersonalizada.value)]
  ];

  products.forEach(([name, qty]) => {
    if (qty > 0) lines.push(`• ${name}: ${qty}`);
  });

  return lines;
};

const finalizeButton = document.getElementById('finalizar');
finalizeButton.addEventListener('click', () => {
  const nome = fields.nome.value.trim();
  const telefone = fields.telefone.value.trim();
  const pagamento = fields.pagamento.value;
  const entrega = fields.entrega.value;
  const endereco = fields.endereco.value.trim();
  const obs = fields.obs.value.trim();

  const orderLines = buildOrderLines();

  if (!nome || orderLines.length === 0) {
    alert('Preencha seu nome e selecione ao menos 1 item do pedido.');
    return;
  }

  const message = [
    'Olá! Quero fazer um pedido na C & C Salgados e Doces 🍟🍬',
    '',
    '*Dados do cliente*',
    `• Nome: ${nome}`,
    `• Telefone: ${telefone || 'Não informado'}`,
    `• Pagamento: ${pagamento}`,
    `• Entrega: ${entrega}`,
    `• Endereço: ${endereco || 'Não informado'}`,
    '',
    '*Itens do pedido*',
    ...orderLines,
    '',
    '*Observações*',
    obs || 'Sem observações',
    '',
    '✅ Destaque: preferência por salgado de festa de 20g.',
    '📌 Consultar taxa de entrega e confirmar valores atualizados.'
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});
