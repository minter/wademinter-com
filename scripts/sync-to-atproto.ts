import { StandardSitePublisher, transformContent } from '@bryanguffey/astro-standard-site';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = join(import.meta.dirname, '..', 'src', 'content', 'blog');
const SITE_URL = 'https://wademinter.com';

const publisher = new StandardSitePublisher({
  identifier: 'wademinter.com',
  password: process.env.ATPROTO_APP_PASSWORD!,
});

await publisher.login();

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const raw = readFileSync(join(BLOG_DIR, file), 'utf-8');

  // Parse frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    console.log(`Skipping ${file}: no frontmatter`);
    continue;
  }

  const frontmatter: Record<string, string> = {};
  for (const line of fmMatch[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      frontmatter[key] = val;
    }
  }

  const body = fmMatch[2];
  const slug = file.replace(/\.md$/, '');

  const transformed = transformContent(body, {
    siteUrl: SITE_URL,
    postPath: `/blog/${slug}`,
  });

  const result = await publisher.publishDocument({
    site: SITE_URL,
    path: `/blog/${slug}`,
    title: frontmatter.title,
    description: frontmatter.description,
    content: {
      $type: 'site.standard.content.markdown',
      text: transformed.markdown,
      version: '1.0',
    },
    textContent: transformed.textContent,
    publishedAt: new Date(frontmatter.date).toISOString(),
  });

  console.log(`Published: ${frontmatter.title}`);
  console.log(`  → ${result.uri}`);
}
