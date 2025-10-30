import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

interface NewsItem {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  image?: string;
  category?: string;
}

// Helper function to format date in Italian
function formatItalianDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return diffMins <= 1 ? '1 minuto fa' : `${diffMins} minuti fa`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? '1 ora fa' : `${diffHours} ore fa`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? '1 giorno fa' : `${diffDays} giorni fa`;
  } else {
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  }
}

export async function GET() {
  try {
    // Fetch RSS feed instead of HTML
    const response = await fetch('https://yesmagazine.it/feed', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    const news: NewsItem[] = [];

    // Parse RSS items
    $('item').each((index, element) => {
      if (index >= 6) return false; // Get only first 6 items

      const $item = $(element);

      // Extract title
      const title = $item.find('title').text().trim();

      // Extract URL
      const url = $item.find('link').text().trim();

      // Extract category
      const category = $item.find('category').first().text().trim() || undefined;

      // Extract description/excerpt - try to get image first
      const descriptionHtml = $item.find('description').text().trim();
      let image: string | undefined = undefined;

      // Try to extract image from description HTML
      const imgMatch = descriptionHtml.match(/<img[^>]+src=["']([^"'>]+)["']/);
      if (imgMatch && imgMatch[1]) {
        image = imgMatch[1];
      }

      // Also try content:encoded if available
      if (!image) {
        const contentEncoded = $item.find('content\\:encoded, encoded').text().trim();
        const imgMatch2 = contentEncoded.match(/<img[^>]+src=["']([^"'>]+)["']/);
        if (imgMatch2 && imgMatch2[1]) {
          image = imgMatch2[1];
        }
      }

      // Clean description and remove HTML
      let description = descriptionHtml.replace(/<[^>]*>/g, ' ');
      description = description.replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = description.length > 120
        ? description.substring(0, 120) + '...'
        : description || 'Leggi l\'articolo completo...';

      // Extract and format date
      const pubDate = $item.find('pubDate').text().trim();
      const date = pubDate ? formatItalianDate(pubDate) : 'Recente';

      if (title && url) {
        news.push({
          title,
          excerpt,
          url,
          date,
          image,
          category,
        });
      }
    });

    console.log(`Fetched ${news.length} articles from RSS feed`);
    if (news.length > 0) {
      console.log('First article:', news[0]);
    }

    // If still no news, return default items
    if (news.length === 0) {
      return NextResponse.json([
        {
          title: "Grande successo per l'ultimo evento su Nexum Channel",
          excerpt: "Record di ascolti per la serata speciale trasmessa ieri...",
          url: "https://yesmagazine.it",
          date: "2 ore fa"
        },
        {
          title: "Nuovi programmi in arrivo sulla piattaforma HbbTV",
          excerpt: "Scopri le novità della programmazione autunnale...",
          url: "https://yesmagazine.it",
          date: "5 ore fa"
        },
        {
          title: "Italian Horse TV: intervista esclusiva",
          excerpt: "Il mondo dell'ippica raccontato dai protagonisti...",
          url: "https://yesmagazine.it",
          date: "1 giorno fa"
        },
      ]);
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);

    // Return fallback data in case of error
    return NextResponse.json([
      {
        title: "Ultime notizie in arrivo",
        excerpt: "Visita YesMagazine.it per tutte le ultime notizie...",
        url: "https://yesmagazine.it",
        date: "Ora"
      },
    ]);
  }
}
