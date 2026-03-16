export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMeta {
  content: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    meta[key] = value;
  }

  return { meta, content: match[2] };
}

// Eagerly import all raw markdown files in src/posts/
const rawModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];

  for (const [path, load] of Object.entries(rawModules)) {
    const raw = (await load()) as string;
    const { meta } = parseFrontmatter(raw);
    const slug = path.replace('../posts/', '').replace('.md', '');
    posts.push({
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? '',
      description: meta.description ?? '',
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const key = `../posts/${slug}.md`;
  const load = rawModules[key];
  if (!load) return null;

  const raw = (await load()) as string;
  const { meta, content } = parseFrontmatter(raw);

  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? '',
    description: meta.description ?? '',
    content,
  };
}
