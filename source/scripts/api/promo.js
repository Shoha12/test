let promoCache = null;

export async function fetchPromoCodes() {
  if (!promoCache) {
    const res = await fetch('./mocks/promo.json');
    promoCache = await res.json();
  }
  return promoCache;
}
