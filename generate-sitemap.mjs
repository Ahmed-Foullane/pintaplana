import fs from 'fs';
import path from 'path';

// 1. Read environment variables manually to avoid needing dotenv or Vite
function loadEnv() {
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) {
    console.warn('No .env.local found. Using .env as fallback.');
    if (!fs.existsSync(path.resolve('.env'))) {
      throw new Error('No .env or .env.local file found.');
    }
    return fs.readFileSync(path.resolve('.env'), 'utf-8');
  }
  return fs.readFileSync(envPath, 'utf-8');
}

const envContent = loadEnv();
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  throw new Error('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing from environment variables.');
}

const DOMAIN = 'https://pintaplana.com';
const STATIC_ROUTES = [
  '/',
  '/about',
  '/products',
  '/catalog',
  '/references',
  '/contact',
  '/blog'
];

async function generateSitemap() {
  console.log('🌍 Generating sitemap...');
  
  // 2. Fetch blog posts from Supabase
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=slug,lang,created_at`, {
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.status} ${res.statusText}`);
  }

  const posts = await res.json();
  console.log(`✓ Fetched ${posts.length} blog posts from database.`);

  // 3. Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  const today = new Date().toISOString();

  // Add static routes
  for (const route of STATIC_ROUTES) {
    xml += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>\n`;
  }

  // Add dynamic blog routes
  for (const post of posts) {
    const postDate = post.created_at ? new Date(post.created_at).toISOString() : today;
    xml += `  <url>
    <loc>${DOMAIN}/blog/${post.lang}/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  xml += `</urlset>`;

  // 4. Save to public folder
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.resolve('public', 'sitemap.xml'), xml);
  console.log('✅ Sitemap successfully generated at public/sitemap.xml');
}

generateSitemap().catch(err => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
