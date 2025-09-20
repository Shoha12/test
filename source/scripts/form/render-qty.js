import renderSummary from './render-summary';

export default function initQty(cart) {
  const cartList = document.querySelector('.cart-list');

  const toggleMinusState = (itemEl) => {
    if (!itemEl) return;
    const input = itemEl.querySelector('.cart-list__qty-input');
    const minusBtn = itemEl.querySelector('.cart-list__qty-btn--minus');
    if (input && minusBtn) {
      minusBtn.disabled = Number(input.value) <= 1;
    }
  };

  cartList.querySelectorAll('.cart-list__item').forEach(toggleMinusState);

  cartList.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.cart-list__item');
    if (!itemEl) return;

    const plusBtn = e.target.closest('.cart-list__qty-btn--plus');
    const minusBtn = e.target.closest('.cart-list__qty-btn--minus');
    if (!plusBtn && !minusBtn) return;

    const id = Number(itemEl.dataset.id);
    const product = cart.find((p) => p.id === id);
    const input = itemEl.querySelector('.cart-list__qty-input');
    if (!product || !input) return;

    let value = Number(input.value);

    if (plusBtn) value += 1;
    if (minusBtn && value > 1) value -= 1;

    input.value = value;
    product.qty = value;

    toggleMinusState(itemEl);
    renderSummary(cart);
  });

  cartList.addEventListener('input', (e) => {
    const input = e.target.closest('.cart-list__qty-input');
    if (!input) return;

    const itemEl = input.closest('.cart-list__item');
    const id = Number(itemEl.dataset.id);
    const product = cart.find((p) => p.id === id);
    if (!product || !itemEl) return;

    let value = input.value.replace(/\D/g, '');
    value = value === '' ? 1 : Number(value);
    if (value < 1) value = 1;

    input.value = value;
    product.qty = value;

    toggleMinusState(itemEl);
    renderSummary(cart);
  });
}
