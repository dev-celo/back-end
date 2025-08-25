import yahooFinance from 'yahoo-finance2';

export async function buscarCotacoesCacau() {
  const NY_SYMBOL = 'CC=F';

  const nyQuote = await yahooFinance.quote(NY_SYMBOL);

  const marketTime = nyQuote?.regularMarketTime;
let horarioFormatado = 'Horário indisponível';

  if (marketTime) {
    const date = new Date(marketTime); // funciona para ISO string ou timestamp em ms
    horarioFormatado = date.toLocaleString('pt-BR', {
      timeZone: 'America/Bahia', // ou "America/New_York", se quiser no fuso da bolsa
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return {
    bolsa: 'New York ICE',
    preco: nyQuote?.regularMarketPrice ?? 'Indisponível',
    variacao: nyQuote?.regularMarketChange ?? 'Indisponível',
    variacao_percentual: nyQuote?.regularMarketChangePercent ?? 'Indisponível',
    moeda: nyQuote?.currency ?? 'USD',
    horario: horarioFormatado,
  };
}
