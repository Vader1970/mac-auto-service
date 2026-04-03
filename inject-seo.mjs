/**
 * inject-seo.mjs
 *
 * Post-build script that creates route-specific index.html files
 * with the correct <title> and <meta name="description"> for each page.
 *
 * Run after `vite build`:
 *   node inject-seo.mjs
 *
 * Or add to package.json scripts:
 *   "build": "vite build && node inject-seo.mjs"
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

// ─── SEO data per route ─────────────────────────────────────────────
// Update these values whenever you change src/constants/seo.js
const routes = [
  {
    path: '/',
    title: 'Mac Auto Services | Christchurch Mechanic — WOF, Repairs & Servicing',
    description:
      'Trusted Christchurch mechanic with 30+ years experience. WOF inspections, car repairs, servicing & maintenance for all makes and models. Bromley, Christchurch. Book today.',
  },
  {
    path: '/about',
    title: 'About Mac Auto Services | Family-Owned Christchurch Mechanic',
    description:
      'Family-owned Christchurch mechanic since 1994. Meet Chris and the team — 30+ years of hands-on experience in WOF inspections, vehicle repairs, and servicing. Bromley, Christchurch.',
  },
  {
    path: '/contact',
    title: 'Contact Mac Auto Services | Book a WOF or Service in Christchurch',
    description:
      'Get in touch with Mac Auto Services in Bromley, Christchurch. Book your WOF, vehicle service, or repair. Call 03 925 9349 or use our online form.',
  },
  {
    path: '/services',
    title: 'Our Services | WOF, Repairs, Servicing & Maintenance — Mac Auto Services',
    description:
      'Full-service Christchurch mechanic: WOF inspections, brake repairs, engine diagnostics, transmission, exhaust, oil changes, and scheduled maintenance. All makes and models.',
  },
  {
    path: '/services/wof',
    title: 'WOF Christchurch | Warrant of Fitness Inspection — Mac Auto Services',
    description:
      'Book a WOF in Christchurch. NZTA-compliant Warrant of Fitness inspections with on-site repairs and same-day rechecks. Cars, trailers, and light trucks. Bromley, Christchurch.',
  },
  {
    path: '/services/repairs',
    title: 'Car Repairs Christchurch | Brakes, Engine & Transmission — Mac Auto Services',
    description:
      'Expert car repairs in Christchurch — brakes, engine diagnostics, transmission, exhaust, suspension, and steering. Honest pricing for cars, vans, utes, and light trucks.',
  },
  {
    path: '/services/servicing',
    title: 'Car Servicing Christchurch | Oil Changes & Scheduled Maintenance — Mac Auto Services',
    description:
      'Routine car servicing in Christchurch — oil changes, filter replacements, and full scheduled maintenance. Warranty-safe work. Combine your WOF and service in one visit.',
  },
];

// ─── Read the base index.html built by Vite ─────────────────────────
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

let count = 0;

for (const route of routes) {
  let html = baseHtml;

  // Replace <title>...</title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace <meta name="description" content="...">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Determine output path
  if (route.path === '/') {
    // Overwrite the root index.html
    writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
  } else {
    // Create folder and index.html for each route
    const dir = join(DIST, route.path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  }

  count++;
  console.log(`✅  ${route.path} → ${route.title}`);
}

console.log(`\nDone! Injected SEO meta for ${count} routes.`);
