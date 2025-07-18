import Parser from 'rss-parser';
import pLimit from 'p-limit';

const parser = new Parser();
const limit = pLimit(3);

export async function fetchRSSFeeds() {
  const FEEDS = [
    { nome: 'The Cocoa Post', url: 'https://thecocoapost.com/feed/', pais: 'Ghana' },
    { nome: 'Confectionery Production', url: 'https://www.confectioneryproduction.com/feed/', pais: 'Global' }
  ];

  const results = await Promise.all(
    FEEDS.map(feed =>
      limit(async () => {
        try {
          const data = await parser.parseURL(feed.url);
          const noticias = data.items.slice(0, 5).map(item => ({
            titulo: item.title || '',
            resumo: item.contentSnippet || item.content || 'Summary not available',
            link: item.link,
            fonte: feed.nome,
            pais: feed.pais,
            data: item.pubDate,
          }));
          return noticias;
        } catch (error) {
          console.error(`Erro no feed ${feed.nome}:`, error);
          return [];
        }
      })
    )
  );

  return results.flat();
}
