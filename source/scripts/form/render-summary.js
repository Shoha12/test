export default function renderSummary(cart, appliedPromo = { code: '', value: 0 }) {
  let totalCurrent = 0;
  let totalOld = 0;

  cart.forEach(item => {
    totalCurrent += item.price * item.qty;
    if (item.oldPrice) {
      totalOld += item.oldPrice * item.qty;
    } else {
      totalOld += item.price * item.qty;
    }
  });


  const promoCode = appliedPromo.code || '';
  const promoValue = Number(appliedPromo) || 0;
  const action = totalOld - totalCurrent;
  const discount = action + promoValue;
  const delivery = 200;
  const grandTotal = totalCurrent + delivery - promoValue;

  const discountEl = document.querySelector('.cart__aside-price--discount');
  if (discountEl) {
    discountEl.textContent = discount > 0 ? `− ${discount.toLocaleString()} ₽` : '0 ₽';
  }

  const actionEl = document.querySelector('.cart__aside-price--action');
  if (actionEl) {
    actionEl.textContent = action > 0 ? `− ${action.toLocaleString()} ₽` : '0 ₽';
  }

  const promoEl = document.querySelector('.cart__aside-price--promo');
  if (promoEl) {
    promoEl.textContent = promoValue > 0 ? `− ${promoValue.toLocaleString()} ₽` : '0 ₽';
  }

  const productsEl = document.querySelector('.cart__aside-price--total');
  if (productsEl) {
    productsEl.textContent = totalOld.toLocaleString() + ' ₽';
  }

  const deliveryEl = document.querySelector('.cart__aside-price--delivery');
  if (deliveryEl) {
    deliveryEl.textContent = delivery.toLocaleString() + ' ₽';
  }

  const totalEl = document.querySelectorAll('.cart__summary-price');
  if (totalEl) {
    totalEl.forEach(el => {
      el.textContent = grandTotal.toLocaleString() + ' ₽';
    });
  }

  return {
    promoCode,
    promoValue,
    grandTotal,
    discount,
    action,
    delivery
  };
}
