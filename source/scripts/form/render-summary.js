export default function renderSummary(cart, appliedPromo = null) {
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

  const discount = totalOld - totalCurrent + appliedPromo;
  const action = totalOld - totalCurrent;
  const delivery = 200;
  const grandTotal = totalCurrent + delivery - appliedPromo;

  const productsEl = document.querySelector('.cart__aside-price--total');
  if (productsEl) {
    productsEl.textContent = totalOld.toLocaleString() + ' ₽';
  }

  const discountEl = document.querySelector('.cart__aside-price--discount');
  if (discountEl) {
    discountEl.textContent = discount > 0 ? `− ${discount.toLocaleString()} ₽` : '0 ₽';
  }

  const deliveryEl = document.querySelector('.cart__aside-price--delivery');
  if (deliveryEl) {
    deliveryEl.textContent = delivery.toLocaleString() + ' ₽';
  }

  const totalEl = document.querySelector('.cart__summary-price strong');
  if (totalEl) {
    totalEl.textContent = grandTotal.toLocaleString() + ' ₽';
  }

  const actionEl = document.querySelector('.cart__aside-price--action');
  if(actionEl) {
    actionEl.textContent = '- ' + action.toLocaleString() + ' ₽';
  }
}
