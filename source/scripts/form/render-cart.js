export default function renderCart(cart) {
  cart.forEach(item => {
    const el = document.querySelector(`.cart-list__item[data-id="${item.id}"]`);
    if (!el) return;

    el.querySelector('.cart-list__title').textContent = item.title;

    const priceEl = el.querySelector('.cart-list__price');
    if (priceEl) {
      priceEl.textContent = item.price.toLocaleString() + ' ₽';
    }

    const qtyInput = el.querySelector('.cart-list__qty-input');
    qtyInput.value = item.qty;

    const totalEl = el.querySelector('.cart-list__total');
    if (totalEl) {
      totalEl.textContent = (item.qty * item.price).toLocaleString() + ' ₽';
    }

    const oldPriceEl = el.querySelector('.cart-list__old-price');
    if (oldPriceEl) {
      if (item.oldPrice) {
        oldPriceEl.textContent = item.oldPrice.toLocaleString() + ' ₽';
        oldPriceEl.style.display = 'inline';
      } else {
        oldPriceEl.style.display = 'none';
      }
    }

    const oldTotalEl = el.querySelector('.cart-list__old-total');
    if (oldTotalEl) {
      if (item.oldPrice) {
        oldTotalEl.textContent = (item.oldPrice * item.qty).toLocaleString() + ' ₽';
        oldTotalEl.style.display = 'inline';
      } else {
        oldTotalEl.style.display = 'none';
      }
    }

    const sizeInput = el.querySelector(`input[name="size-${item.id}"][value="${item.size}"]`);
    if (sizeInput) sizeInput.checked = true;

    const colorInput = el.querySelector(`input[name="color-${item.id}"][value="${item.color}"]`);
    if (colorInput) colorInput.checked = true;
  });


}
