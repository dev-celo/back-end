import yahooFinance from 'yahoo-finance2';

export async function buscarCotacoesCacau() {
  const NY_SYMBOL = 'CC=F';

  const nyQuote = await yahooFinance.quote(NY_SYMBOL);

  console.log('nyQuote:', nyQuote);

  const marketTime = nyQuote?.regularMarketTime;

  // Garantindo que seja um número antes de multiplicar
  const horarioFormatado =
    typeof marketTime === 'number'
      ? new Date(marketTime * 1000).toLocaleString('pt-BR', { timeZone: 'America/New_York' })
      : 'Horário indisponível';

  return {
    bolsa: 'New York ICE',
    preco: nyQuote?.regularMarketPrice ?? 'Indisponível',
    variacao: nyQuote?.regularMarketChange ?? 'Indisponível',
    variacao_percentual: nyQuote?.regularMarketChangePercent ?? 'Indisponível',
    moeda: nyQuote?.currency ?? 'USD',
    horario: horarioFormatado,
  };
}
