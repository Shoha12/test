let cartCache = null;

export async function fetchCart() {
  if (!cartCache) {
    const res = await fetch('./mocks/cart.json');
    cartCache = await res.json();
  }
  return cartCache;
}
