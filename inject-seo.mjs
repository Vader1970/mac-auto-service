/**
 * inject-seo.mjs
 *
 * Post-build script that creates route-specific index.html files
 * with the correct <title>, <meta name="description">, and
 * FAQPage structured data for each page.
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

// ─── FAQ data per page ──────────────────────────────────────────────

const homeFaqs = [
  {
    question: "What services does your mechanic workshop provide?",
    answer: "We offer a full range of automotive services, including Warrant of Fitness (WOF) inspections, routine servicing, brake repairs, engine diagnostics, mechanical repairs, and pre-purchase inspections for cars, motorhomes, trailers, and light trucks."
  },
  {
    question: "Do you carry out Warrant of Fitness (WOF) inspections?",
    answer: "Yes, we provide thorough WOF inspections in line with New Zealand safety standards. If repairs are required, we'll explain exactly what needs attention and provide a clear quote before starting any work."
  },
  {
    question: "What happens if my vehicle fails its WOF?",
    answer: "If your vehicle doesn't pass inspection, we'll give you a detailed list of required repairs. You have 28 days to complete the work and return for a recheck."
  },
  {
    question: "How often should I service my car?",
    answer: "Most vehicles should be serviced every 10,000 - 15,000km or once a year, whichever comes first. Regular servicing helps prevent breakdowns, improves fuel efficiency, and extends the life of your vehicle."
  },
  {
    question: "Can you diagnose engine warning lights?",
    answer: "Absolutely. We use modern diagnostic equipment to identify engine fault codes and performance issues. Once diagnosed, we'll explain the problem in plain English and outline the next steps."
  },
  {
    question: "Do you provide brake repairs and replacements?",
    answer: "Yes. We inspect and repair brake pads, discs, and related components. If you hear squealing, grinding, or notice reduced braking performance, it's important to have your brakes checked promptly."
  },
  {
    question: "Do you repair major mechanical issues like engines and gearboxes?",
    answer: "Our experienced mechanics handle everything from minor repairs to complex engine and gearbox work, focusing on reliable, long-term solutions."
  },
  {
    question: "Do you work on all vehicle makes and models?",
    answer: "We service most makes and models, including petrol and diesel vehicles. If you're unsure about your specific vehicle, feel free to contact us."
  },
  {
    question: "What's included in a full vehicle service?",
    answer: "A standard service typically includes an oil and filter change, fluid checks, brake inspection, tyre condition check, and a general safety and mechanical assessment."
  },
  {
    question: "Do you offer pre-purchase vehicle inspections?",
    answer: "Yes. If you're buying a used vehicle, we can carry out a detailed inspection to help you understand its mechanical condition before committing."
  },
  {
    question: "Where are you located and how do I book an appointment?",
    answer: "Our workshop is conveniently located in Bromley, serving drivers across Christchurch. You can book your WOF, service, or repairs by calling us or using form below."
  }
];

const wofFaqs = [
  {
    question: "What's included in a WOF?",
    answer: "A WOF inspection covers safety-critical items such as brakes, tyres, steering, suspension, lights, seatbelts, windscreen, wipers, structural condition, and exhaust. Our inspectors follow NZTA guidelines to ensure your vehicle meets legal safety standards."
  },
  {
    question: "What happens if my WOF fails?",
    answer: "If your vehicle fails its WOF, we'll give you a clear report of what needs to be fixed. We can carry out most repairs on-site and then recheck your vehicle. Once it meets the standard, we'll issue your WOF so you can get back on the road without delay."
  },
  {
    question: "How often do I need a WOF?",
    answer: "Vehicles first registered in New Zealand before 1 January 2000 need a WOF every 6 months. Vehicles registered on or after that date need a WOF every 12 months. Keeping your WOF current is a legal requirement and helps keep you and others safe."
  },
  {
    question: "Do I need to book an appointment for a WOF?",
    answer: "Yes. We recommend booking so we can allocate time for your inspection and any follow-up work. You can call us or get in touch via our website to book a time that suits you."
  },
  {
    question: "How much does a WOF cost?",
    answer: "Our WOF inspection fee is competitive and transparent. If repairs are required, we'll provide a quote before doing any work. Contact us or visit for the current WOF price and to book."
  },
  {
    question: "Is a WOF the same as a vehicle service?",
    answer: "No. A WOF is a safety inspection required by law to check that your vehicle meets minimum roadworthiness standards. A service includes maintenance such as oil and filter changes, fluid checks, and wear-and-tear items. We offer both WOF inspections and full servicing."
  }
];

const servicingFaqs = [
  {
    question: "What does a full vehicle service include?",
    answer: "A full service generally includes changing the engine oil and filter, checking and topping up all fluids (coolant, brake fluid, steering fluid), inspecting brakes, steering, suspension, and tires, as well as checking the lights and battery. We follow a comprehensive checklist to ensure your vehicle is in peak condition."
  },
  {
    question: "How often should I get my car serviced?",
    answer: "We recommend a minor service every 10,000 km or 6 months, and a major service every 20,000 km or 12 months. Regular servicing helps prevent unexpected breakdowns, improves fuel efficiency, and significantly extends the life of your engine."
  },
  {
    question: "Do you use premium parts and oils?",
    answer: "Yes, we only use high-quality, reputable brands for engine oils, filters, and replacement parts. We ensure that the products used meet or exceed the manufacturer's specifications for your specific vehicle, giving you peace of mind."
  },
  {
    question: "Can I get a WOF and a service done on the same day?",
    answer: "Absolutely! We highly recommend combining your Warrant of Fitness (WOF) inspection with a regular service. This saves you time and ensures all your vehicle maintenance is up to date in one convenient visit."
  },
  {
    question: "Will servicing my new car with you void the manufacturer's warranty?",
    answer: "No. Under New Zealand law, you have the right to choose where your vehicle is serviced without voiding the manufacturer's statutory warranty, provided the service is carried out to the manufacturer's specifications using appropriate quality parts, which we always adhere to."
  }
];

// ─── Helper: build FAQPage JSON-LD ──────────────────────────────────

function buildFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return '';

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// ─── SEO data per route ─────────────────────────────────────────────
// Update these values whenever you change src/constants/seo.js
const routes = [
  {
    path: '/',
    title: 'Mac Auto Services | Christchurch Mechanic — WOF, Repairs & Servicing',
    description:
      'Trusted Christchurch mechanic with 30+ years experience. WOF inspections, car repairs, servicing & maintenance for all makes and models. Bromley, Christchurch. Book today.',
    faqs: homeFaqs,
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
    faqs: wofFaqs,
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
    faqs: servicingFaqs,
  },
];

// ─── Read the base index.html built by Vite ─────────────────────────
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

let count = 0;
let faqCount = 0;

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

  // Inject FAQ schema before </head> if this page has FAQs
  if (route.faqs && route.faqs.length > 0) {
    const faqSchema = buildFaqSchema(route.faqs);
    html = html.replace('</head>', `${faqSchema}\n  </head>`);
    faqCount++;
  }

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
  const faqLabel = route.faqs ? ` + ${route.faqs.length} FAQs` : '';
  console.log(`✅  ${route.path} → ${route.title}${faqLabel}`);
}

console.log(`\nDone! Injected SEO meta for ${count} routes (${faqCount} with FAQ schema).`);
