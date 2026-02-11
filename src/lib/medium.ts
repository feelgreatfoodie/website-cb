import Parser from 'rss-parser';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  thumbnail: string | null;
}

const parser = new Parser({
  customFields: {
    item: [['content:encoded', 'contentEncoded']],
  },
});

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match?.[1] ?? null;
}

function toTitleCase(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getMediumPosts(count: number = 3): Promise<MediumPost[]> {
  try {
    const feed = await parser.parseURL(
      'https://medium.com/feed/@christianbourlier',
    );

    return (feed.items ?? []).slice(0, count).map((item) => ({
      title: item.title ?? 'Untitled',
      link: item.link ?? '#',
      pubDate: item.pubDate ?? '',
      categories: (item.categories ?? [])
        .slice(0, 3)
        .map((c) => toTitleCase(c)),
      thumbnail: extractFirstImage(
        (item as unknown as Record<string, string>).contentEncoded ?? '',
      ),
    }));
  } catch {
    return [];
  }
}
