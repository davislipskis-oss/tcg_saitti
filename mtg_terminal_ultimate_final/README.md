
# Sealed Intelligence Terminal

A traffic-first MTG sealed product site built for collectors and speculators who want to decide whether a product should be opened, held or watched longer.

## What is included

- Landing page focused on decision intelligence, not generic card-game copy
- Signals page with tracked products
- Market overview page
- Retail scanner page
- Individual product pages for 15 high-interest sealed products
- Methodology, About, Contact and legal pages
- Snapshot-based seed dataset with European retailer pricing references
- Automatic scraper layer for tracked retailer URLs
- Snapshot API and cron-ready refresh route
- Robots, sitemap and 404 pages

## Architecture

This version uses a hybrid model:

1. **Seed snapshots** live in `data/products.js`
2. **Retail scraper layer** attempts fresh checks for retailer product URLs
3. **Snapshot engine** caches fresh checks by product layer
4. **UI** always shows the best available result:
   - live scrape when a retailer URL responds
   - snapshot fallback when no live result is available

That makes the product fast and stable without fake “live” claims.

## Retailer layer included

The first European retailer layer is configured in `lib/retailers.js`.

Current first-wave stores:

- Poromagia
- Fantasiapelit
- Bazaar of Magic
- Games Island
- Playin
- Puolenkuun Pelit
- Gate to the Games
- Trader Online

## Product layers

- **Layer 1**: refresh most often
- **Layer 2**: medium refresh cadence
- **Layer 3**: slow refresh cadence

Configured cache cadence in this version:

- Layer 1 → up to every 6 hours
- Layer 2 → up to every 12 hours
- Layer 3 → up to every 24 hours

## Before launch

Replace the placeholder values below:

- `https://example.com` in `app/layout.js`, `app/robots.js` and `app/sitemap.js`
- `hello@example.com` on the Contact page
- retailer product URLs in `data/products.js`

### Important

The scraper layer works best when every offer has a real retailer product URL.

Right now many rows still use `href: '#'` as placeholders. Those rows will correctly fall back to the seed snapshot until you attach real URLs.

## Environment variables

Create a `.env.local` file from `.env.example`.

```bash
CRON_SECRET=replace_me_with_a_long_random_value
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API routes

### `GET /api/snapshots?slug=product-slug`

Returns a fresh or cached snapshot for one product.

### `GET /api/snapshots`

Returns scanner-style snapshots for all tracked products.

### `GET /api/cron/snapshots`

Cron-ready refresh route.  
If `CRON_SECRET` is set, call it with:

```bash
Authorization: Bearer YOUR_SECRET
```

### `GET /api/scraper-status`

Returns the current retailer layer and mode.

## Vercel cron

This project includes `vercel.json` with a 6-hour refresh schedule:

- `/api/cron/snapshots`

You can adjust that schedule later as your retailer coverage expands.

## Recommended next step

For durable snapshots across deploys and regions, connect:

- Supabase
- Vercel KV
- or another persistent store

This version is designed to get you live quickly while keeping the scraper and snapshot model structurally correct.

## Deployment

This project is designed for GitHub + Vercel.

1. Upload the clean project files to GitHub
2. Import the repository into Vercel
3. Set the root directory to the repository root
4. Add `CRON_SECRET` in Vercel environment variables
5. Deploy

## Important note on data

Prices are checked from public product pages and may change without notice. Always verify the final retailer price before purchasing.


## Added market-intelligence layer

- Cardmarket anchor metrics parsing (best effort)
- Availability counter per snapshot
- Snapshot-based retailer coverage for Europe-first sealed analysis
