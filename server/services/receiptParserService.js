const parseCurrency = (text) => {
  const currencyMatch = text.match(/\b(USD|EUR|GBP|NGN|CAD|AUD)\b/i);
  return currencyMatch ? currencyMatch[1].toUpperCase() : 'USD';
};

const parseTotal = (text) => {
  const totalRegexes = [/total\s*[:\-]?\s*([0-9]+(?:\.[0-9]{2})?)/i, /amount\s*[:\-]?\s*([0-9]+(?:\.[0-9]{2})?)/i, /([0-9]+\.[0-9]{2})\s*$/m];
  for (const regex of totalRegexes) {
    const match = text.match(regex);
    if (match) return Number(match[1]);
  }
  return null;
};

const parseDate = (text) => {
  const dateMatch = text.match(/(\d{4}[\/-]\d{2}[\/-]\d{2}|\d{2}[\/-]\d{2}[\/-]\d{4})/);
  if (!dateMatch) return null;
  const normalized = dateMatch[1].replace(/\//g, '-');
  const candidate = new Date(normalized);
  return Number.isNaN(candidate.getTime()) ? null : candidate;
};

const parseMerchant = (text) => {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return lines[0] || 'Unknown Merchant';
};

const parseItems = (text) => {
  const lines = text.split(/\r?\n/);
  return lines
    .map((line) => line.match(/^([A-Za-z0-9\s\-]+)\s+([0-9]+(?:\.[0-9]{2})?)$/))
    .filter(Boolean)
    .slice(0, 20)
    .map((match) => ({ name: match[1].trim(), price: Number(match[2]) }));
};

const parseReceiptText = (rawText) => {
  const total = parseTotal(rawText);
  const date = parseDate(rawText);
  const merchant = parseMerchant(rawText);
  const currency = parseCurrency(rawText);
  const items = parseItems(rawText);

  const confidentFields = [total, date, merchant].filter(Boolean).length;
  const extractionStatus = confidentFields >= 3 ? 'complete' : confidentFields > 0 ? 'partial' : 'failed';

  return { total: total || 0, date, merchant, currency, items, extractionStatus };
};

module.exports = { parseReceiptText };
