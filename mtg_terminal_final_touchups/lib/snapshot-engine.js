import { getProduct, products } from '@/data/products';
import { retailerRegistry } from '@/lib/retailers';
import { toOfferResult } from '@/lib/price-scrapers';

const CACHE_TTL_MS = {
  'Layer 1': 1000 * 60 * 60 * 6,
  'Layer 2': 1000 * 60 * 60 * 12,
  'Layer 3': 1000 * 60 * 60 * 24,
};

const globalCache = globalThis.__MTG_SNAPSHOT_CACHE__ || new Map();
globalThis.__MTG_SNAPSHOT_CACHE__ = globalCache;

async function fetchHtml(url) {
  if (!url || url === '#') return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'SealedTerminalBot/1.0 (+https://example.com)',
        'accept-language': 'en-US,en;q=0.9,fi;q=0.8'
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function getCacheKey(product) {
  return product.slug;
}

function getTtl(product) {
  return CACHE_TTL_MS[product.layer] || CACHE_TTL_MS['Layer 2'];
}

function buildAvailabilityCounter(offers) {
  const availableOffers = offers.filter((offer) => offer.available);
  const tierACount = availableOffers.filter((offer) => offer.tier === 'A').length;
  const tierBCount = availableOffers.filter((offer) => offer.tier === 'B').length;
  const tierCCount = availableOffers.filter((offer) => offer.tier === 'C').length;
  return {
    totalAvailable: availableOffers.length,
    totalTracked: offers.length,
    tierACount,
    tierBCount,
    tierCCount,
    availabilityRatio: offers.length ? availableOffers.length / offers.length : 0,
  };
}

function buildCardmarketAnchor(product, offers) {
  const cardmarketOffer = offers.find((offer) => offer.retailer === 'Cardmarket');
  const metrics = cardmarketOffer?.cardmarket || null;
  if (!cardmarketOffer) return null;

  const lowestRetailPrice = offers.filter((offer) => offer.price != null).sort((a, b) => a.price - b.price)[0]?.price ?? null;
  const referencePrice = metrics?.priceTrend ?? metrics?.avg7d ?? metrics?.avg30d ?? cardmarketOffer.price ?? null;
  const euSpread = referencePrice != null && lowestRetailPrice != null ? lowestRetailPrice - referencePrice : null;

  return {
    href: cardmarketOffer.href,
    currentPrice: cardmarketOffer.price,
    referencePrice,
    priceTrend: metrics?.priceTrend ?? null,
    avg7d: metrics?.avg7d ?? null,
    avg30d: metrics?.avg30d ?? null,
    suggestedPrice: metrics?.suggestedPrice ?? null,
    availableArticles: metrics?.availableArticles ?? null,
    shortTrend: metrics?.shortTrend ?? null,
    euSpread,
    source: cardmarketOffer.source,
  };
}

function summarizeProduct(product, offers, checkedAt) {
  const pricedOffers = offers.filter((offer) => offer.price != null).sort((a, b) => a.price - b.price);
  const lowestTrackedPrice = pricedOffers[0]?.price ?? product.lowestTrackedPrice ?? null;
  const storesTracked = offers.length;
  const liveRetailers = offers.filter((offer) => offer.source === 'live-scrape').length;
  const regionsCovered = new Set(offers.map((offer) => offer.region).filter(Boolean)).size;
  const availabilityCounter = buildAvailabilityCounter(offers);
  const cardmarketAnchor = buildCardmarketAnchor(product, offers);

  return {
    slug: product.slug,
    checkedAt,
    liveRetailers,
    storesTracked,
    countriesCovered: regionsCovered || product.countriesCovered || 0,
    lowestTrackedPrice,
    availabilityCounter,
    cardmarketAnchor,
    offers,
    cacheTtlHours: Math.round(getTtl(product) / 36e5),
    layer: product.layer,
    refreshPlan: product.refreshPlan,
  };
}

export async function buildProductSnapshot(slug, options = {}) {
  const product = typeof slug === 'string' ? getProduct(slug) : slug;
  if (!product) return null;

  const force = Boolean(options.force);
  const cacheKey = getCacheKey(product);
  const cached = globalCache.get(cacheKey);

  if (!force && cached && (Date.now() - cached.generatedAt) < getTtl(product)) {
    return cached.payload;
  }

  const checkedAt = new Date().toISOString();
  const offers = await Promise.all(
    product.offers.map(async (offer) => {
      const html = await fetchHtml(offer.href);
      return {
        ...toOfferResult({
          retailer: offer.retailer,
          href: offer.href,
          checkedAt,
          html,
          fallbackPrice: offer.price,
          fallbackAvailable: offer.available,
        }),
        tier: retailerRegistry[offer.retailer]?.tier || 'B',
        region: retailerRegistry[offer.retailer]?.region || 'Europe',
      };
    })
  );

  const payload = summarizeProduct(product, offers, checkedAt);
  globalCache.set(cacheKey, { generatedAt: Date.now(), payload });
  return payload;
}

export async function buildScannerSnapshot() {
  const snapshots = await Promise.all(products.map((product) => buildProductSnapshot(product)));
  return snapshots.filter(Boolean);
}
