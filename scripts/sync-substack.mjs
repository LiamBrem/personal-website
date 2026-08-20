// Pulls new posts from the Substack RSS feed and writes them into src/posts/
// as markdown files matching this site's frontmatter format. Existing files
// are never overwritten, so re-running is safe.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';

const FEED_URL = 'https://liambrem.substack.com/feed';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, '../src/posts');

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(pubDate) {
  return new Date(pubDate).toISOString().slice(0, 10);
}

function flatten(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function normalizeTitle(title) {
  return flatten(title).toLowerCase();
}

function existingTitles() {
  const titles = new Set();
  for (const file of fs.readdirSync(POSTS_DIR)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) continue;
    for (const line of match[1].split('\n')) {
      const colon = line.indexOf(':');
      if (colon === -1) continue;
      if (line.slice(0, colon).trim() !== 'title') continue;
      titles.add(normalizeTitle(line.slice(colon + 1)));
      break;
    }
  }
  return titles;
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

async function main() {
  const res = await fetch(FEED_URL, {
    headers: {
      // Substack's Cloudflare bot protection 403s requests from generic
      // HTTP clients (including GitHub Actions runners) without a
      // browser-like User-Agent.
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch Substack feed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml);
  const rawItems = feed?.rss?.channel?.item ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  fs.mkdirSync(POSTS_DIR, { recursive: true });

  const seen = existingTitles();
  const created = [];

  for (const item of items) {
    const title = flatten(item.title);
    if (!title) continue;
    if (seen.has(normalizeTitle(title))) continue;

    const slug = slugify(title);
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) continue;

    const date = formatDate(item.pubDate);
    const description = flatten(item.description);
    const html = item['content:encoded'] ?? '';
    const markdown = turndown.turndown(html).trim();

    const frontmatter = [
      '---',
      `title: ${title}`,
      `date: ${date}`,
      `description: ${description}`,
      '---',
      '',
      markdown,
      '',
    ].join('\n');

    fs.writeFileSync(filePath, frontmatter, 'utf8');
    created.push(slug);
  }

  if (created.length > 0) {
    console.log(`Created ${created.length} new post(s):\n${created.map((s) => `  - ${s}`).join('\n')}`);
  } else {
    console.log('No new posts found.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
