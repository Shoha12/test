async function cartData() {
  const response = await fetch('../../mocks/cart.json');

  return await response.json();
}


async function promoData() {
  const response = await fetch('../../mocks/promo.json');

  return await response.json();
}


export {cartData, promoData};
