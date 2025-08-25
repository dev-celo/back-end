import Parser from 'rss-parser';
import pLimit from 'p-limit';
import NodeCache from 'node-cache';

const parser = new Parser();
const limit = pLimit(10);
const cache = new NodeCache({ stdTTL: 600 }); // Cache de 10 minutos

const FEEDS = [
  { nome: 'The Cocoa Post', url: 'https://thecocoapost.com/feed/', pais: 'Ghana' },
  { nome: 'The Cocoa Post', url: 'https://thecocoapost.com/feed/', pais: 'Ivory Coast' },
  { nome: 'Confectionery Production', url: 'https://www.confectioneryproduction.com/feed/', pais: 'Global' }
];

export async function fetchRSSFeeds() {
  // Verifica se existe no cache
  const cachedNews = cache.get('rssFeeds');
  if (cachedNews) {
    return cachedNews;
  }

  try {
    const results = await Promise.all(
      FEEDS.map(feed =>
        limit(async () => {
          try {
            const data = await parser.parseURL(feed.url);
            return data.items.slice(0, 5).map(item => ({
              titulo: item.title || '',
              resumo: item.contentSnippet || item.content || 'Resumo não disponível',
              link: item.link || '#',
              fonte: feed.nome,
              pais: feed.pais,
              data: item.pubDate || '',
            }));
          } catch (error) {
            console.error(`Erro no feed ${feed.nome}:`, error);
            return [];
          }
        })
      )
    );

    const noticias = results.flat();
    cache.set('rssFeeds', noticias); // Armazena no cache
    
    return noticias;

  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return []; // Retorna array vazio em caso de erro
  }
}