export default function renderSummary(cart, appliedPromo = { code: '', value: 0 }) {

  const discountEl = document.querySelector('.cart__aside-price--discount');
  const actionEl = document.querySelector('.cart__aside-price--action');
  const promoEl = document.querySelector('.cart__aside-price--promo');
  const productsEl = document.querySelector('.cart__aside-price--total');
  const deliveryEl = document.querySelector('.cart__aside-price--delivery');
  const totalEls = document.querySelectorAll('.cart__summary-price');

  let totalCurrent = 0;
  let totalOld = 0;

  cart.forEach(item => {
    totalCurrent += item.price * item.qty;
    totalOld += (item.oldPrice || item.price) * item.qty;
  });

  const promoCode = appliedPromo.code || '';
  const promoValue = appliedPromo.value || 0;
  const action = totalOld - totalCurrent;
  const discount = action + promoValue;
  const delivery = 200;
  const grandTotal = totalCurrent + delivery - promoValue;


  if (discountEl) discountEl.textContent = discount > 0 ? `− ${discount.toLocaleString()} ₽` : '0 ₽';
  if (actionEl) actionEl.textContent   = action > 0 ? `− ${action.toLocaleString()} ₽` : '0 ₽';
  if (promoEl) promoEl.textContent    = promoValue > 0 ? `− ${promoValue.toLocaleString()} ₽` : '0 ₽';
  if (productsEl) productsEl.textContent = totalCurrent.toLocaleString() + ' ₽';
  if (deliveryEl) deliveryEl.textContent = delivery.toLocaleString() + ' ₽';

  totalEls.forEach(el => {
    el.textContent = grandTotal.toLocaleString() + ' ₽';
  });

  return { promoCode, promoValue, grandTotal, discount, action, delivery };
}
