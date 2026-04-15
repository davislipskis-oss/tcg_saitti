const PRICE_PATTERNS = [
  /itemprop=["']price["'][^>]*content=["']([\d.,]+)/i,
  /"price"\s*:\s*"?(\d+[\.,]\d{2})"?/i,
  /property=["']product:price:amount["'][^>]*content=["']([\d.,]+)/i,
  /data-price=["']([\d.,]+)["']/i,
  /([\d]{1,4}[\.,]\d{2})\s?€/i,
];

const SOLD_OUT_PATTERNS = [
  /sold out/i,
  /out of stock/i,
  /loppu/i,
  /ei saatavilla/i,
  /unavailable/i,
  /currently unavailable/i,
];

function parseNumber(raw) {
  if (!raw) return null;
  const normalized = raw.replace(/\s/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.');
  const price = Number(normalized);
  return Number.isFinite(price) ? price : null;
}

function extractLabeledValue(html, labels) {
  const variants = Array.isArray(labels) ? labels : [labels];
  for (const label of variants) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escaped}[\\s\\S]{0,180}?([\\d]{1,4}[\\.,]\\d{2})\\s?€`, 'i');
    const match = html.match(regex);
    if (match?.[1]) {
      const value = parseNumber(match[1]);
      if (value != null) return value;
    }
  }
  return null;
}

function extractIntNearLabel(html, labels) {
  const variants = Array.isArray(labels) ? labels : [labels];
  for (const label of variants) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escaped}[\\s\\S]{0,120}?([\\d]{1,5})`, 'i');
    const match = html.match(regex);
    if (match?.[1]) {
      const value = Number(match[1]);
      if (Number.isFinite(value)) return value;
    }
  }
  return null;
}

export function extractPrice(html) {
  for (const pattern of PRICE_PATTERNS) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const value = parseNumber(match[1]);
      if (value != null) return value;
    }
  }
  return null;
}

export function extractAvailability(html) {
  return !SOLD_OUT_PATTERNS.some((pattern) => pattern.test(html));
}

export function extractCardmarketMetrics(html) {
  if (!html) return null;

  const priceTrend = extractLabeledValue(html, ['Price Trend', 'Trend Price']);
  const avg7d = extractLabeledValue(html, ['7-days average price', '7 day average price']);
  const avg30d = extractLabeledValue(html, ['30-days average price', '30 day average price']);
  const suggestedPrice = extractLabeledValue(html, ['Suggested Price', 'Trend']);
  const availableArticles = extractIntNearLabel(html, ['Available Articles', 'Articles available', 'Available offers', 'Offers']);

  if ([priceTrend, avg7d, avg30d, suggestedPrice, availableArticles].every((value) => value == null)) {
    return null;
  }

  let shortTrend = null;
  if (priceTrend != null && avg7d != null && avg7d !== 0) {
    shortTrend = ((priceTrend - avg7d) / avg7d) * 100;
  } else if (priceTrend != null && avg30d != null && avg30d !== 0) {
    shortTrend = ((priceTrend - avg30d) / avg30d) * 100;
  }

  return {
    priceTrend,
    avg7d,
    avg30d,
    suggestedPrice,
    availableArticles,
    shortTrend,
  };
}

export function computeFreshness(checkedAt) {
  const diffHours = (Date.now() - new Date(checkedAt).getTime()) / 36e5;
  if (diffHours <= 6) return 'Very fresh';
  if (diffHours <= 24) return 'Fresh';
  if (diffHours <= 72) return 'Aging';
  return 'Stale';
}

export function toOfferResult({ retailer, href, checkedAt, html, fallbackPrice, fallbackAvailable }) {
  const livePrice = extractPrice(html);
  const liveAvailable = extractAvailability(html);
  const cardmarket = retailer === 'Cardmarket' ? extractCardmarketMetrics(html) : null;
  const source = livePrice != null ? 'live-scrape' : 'snapshot-fallback';

  return {
    retailer,
    href,
    checkedAt,
    freshness: computeFreshness(checkedAt),
    source,
    price: livePrice ?? fallbackPrice ?? null,
    available: livePrice != null ? liveAvailable : (fallbackAvailable ?? false),
    cardmarket,
  };
}
