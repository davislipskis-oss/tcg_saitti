export const retailerRegistry = {
  Cardmarket: {
    tier: 'A',
    region: 'Pan-Europe',
    currency: 'EUR',
    note: 'Primary European price anchor for sealed MTG products.',
    parse: 'generic'
  },
  'Bazaar of Magic': {
    tier: 'A',
    region: 'Netherlands',
    currency: 'EUR',
    note: 'Major Benelux price anchor for sealed MTG.',
    parse: 'generic'
  },
  'Games Island': {
    tier: 'A',
    region: 'Germany',
    currency: 'EUR',
    note: 'Major DACH sealed retailer and price anchor.',
    parse: 'generic'
  },
  Playin: {
    tier: 'A',
    region: 'France',
    currency: 'EUR',
    note: 'Large French TCG retailer with strong MTG coverage.',
    parse: 'generic'
  },
  'Gate to the Games': {
    tier: 'B',
    region: 'Germany',
    currency: 'EUR',
    note: 'Useful secondary DACH signal and inventory check.',
    parse: 'generic'
  },
  'Trader Online': {
    tier: 'B',
    region: 'Germany',
    currency: 'EUR',
    note: 'Secondary German price discovery layer.',
    parse: 'generic'
  },
  Alphaspel: {
    tier: 'B',
    region: 'Sweden',
    currency: 'SEK',
    note: 'Nordic signal layer for sealed MTG demand.',
    parse: 'generic'
  },
  Outpost: {
    tier: 'B',
    region: 'Belgium',
    currency: 'EUR',
    note: 'Benelux confirmation layer for availability shifts.',
    parse: 'generic'
  },
  'TCG Corner': {
    tier: 'B',
    region: 'Netherlands',
    currency: 'EUR',
    note: 'Supplementary Benelux retailer coverage.',
    parse: 'generic'
  },
  Paperdealer: {
    tier: 'B',
    region: 'Slovenia',
    currency: 'EUR',
    note: 'Central European niche coverage.',
    parse: 'generic'
  },
  Poromagia: {
    tier: 'C',
    region: 'Finland',
    currency: 'EUR',
    note: 'Regional Nordic confirmation and local buyer relevance.',
    parse: 'generic'
  },
  Fantasiapelit: {
    tier: 'C',
    region: 'Finland',
    currency: 'EUR',
    note: 'Regional Nordic confirmation and local buyer relevance.',
    parse: 'generic'
  },
  'Puolenkuun Pelit': {
    tier: 'C',
    region: 'Finland',
    currency: 'EUR',
    note: 'Regional Finnish supply confirmation layer.',
    parse: 'generic'
  }
};

export const retailerList = Object.entries(retailerRegistry).map(([name, meta]) => ({ name, ...meta }));
