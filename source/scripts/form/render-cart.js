export default function renderCart(cart) {
  cart.forEach(item => {
    if (item.removed) return;

    const el = document.querySelector(`.cart-list__item[data-id="${item.id}"]`);
    if (!el) return;

    const titleEl = el.querySelector('.cart-list__title');
    const priceEl = el.querySelector('.cart-list__price');
    const qtyInput = el.querySelector('.cart-list__qty-input');
    const totalEl = el.querySelector('.cart-list__total');
    const oldPriceEl = el.querySelector('.cart-list__old-price');
    const oldTotalEl = el.querySelector('.cart-list__old-total');
    const sizeInput = el.querySelector(`input[name="size-${item.id}"][value="${item.size}"]`);
    const colorInput = el.querySelector(`input[name="color-${item.id}"][value="${item.color}"]`);
    const minusBtn = el.querySelector('.cart-list__qty-btn--minus');

    if (titleEl) titleEl.textContent = item.title;
    if (priceEl) priceEl.textContent = item.price.toLocaleString() + ' ₽';

    if (qtyInput) qtyInput.value = item.qty;
    if (totalEl) totalEl.textContent = (item.qty * item.price).toLocaleString() + ' ₽';

    if (oldPriceEl) {
      if (item.oldPrice) {
        oldPriceEl.textContent = item.oldPrice.toLocaleString() + ' ₽';
        oldPriceEl.style.display = 'inline';
      } else {
        oldPriceEl.style.display = 'none';
      }
    }

    if (oldTotalEl) {
      if (item.oldPrice) {
        oldTotalEl.textContent = (item.oldPrice * item.qty).toLocaleString() + ' ₽';
        oldTotalEl.style.display = 'inline';
      } else {
        oldTotalEl.style.display = 'none';
      }
    }

    if (sizeInput) sizeInput.checked = true;
    if (colorInput) colorInput.checked = true;
    if (minusBtn) minusBtn.disabled = item.qty <= 1;
  });
}

export function collectCartData(cart) {
  return cart.map(item => {
    if (item.removed) return null;

    const el = document.querySelector(`.cart-list__item[data-id="${item.id}"]`);
    if (!el) return null;

    const size = el.querySelector(`input[name="size-${item.id}"]:checked`)?.value;
    const color = el.querySelector(`input[name="color-${item.id}"]:checked`)?.value;
    const qty = Number(el.querySelector('.cart-list__qty-input')?.value || 1);

    return { id: item.id, size, color, qty };
  }).filter(Boolean);
}
