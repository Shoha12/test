import renderCart from './render-cart';
import renderSummary from './render-summary';

export default function initQty(cart) {
  const cartList = document.querySelector('.cart-list');

  cartList.addEventListener('click', (e) => {
    const plusBtn = e.target.closest('.cart-list__qty-btn--plus');
    const minusBtn = e.target.closest('.cart-list__qty-btn--minus');
    const itemEl = e.target.closest('.cart-list__item');

    if (!itemEl) return;

    const id = Number(itemEl.dataset.id);
    const product = cart.find((p) => p.id === id);
    const input = itemEl.querySelector('.cart-list__qty-input');
    const minus = itemEl.querySelector('.cart-list__qty-btn--minus');

    const toggleMinusState = () => {
      minus.disabled = Number(input.value) <= 1;
    };

    if (plusBtn) {
      input.value = Number(input.value) + 1;
      if (product) product.qty = Number(input.value);
      toggleMinusState();
      renderCart(cart);
      renderSummary(cart);
    }

    if (minusBtn && Number(input.value) > 1) {
      input.value = Number(input.value) - 1;
      if (product) product.qty = Number(input.value);
      toggleMinusState();
      renderCart(cart);
      renderSummary(cart);
    }
  });

  cartList.addEventListener('input', (e) => {
    const input = e.target.closest('.cart-list__qty-input');
    if (!input) return;

    const itemEl = input.closest('.cart-list__item');
    const id = Number(itemEl.dataset.id);
    const product = cart.find((p) => p.id === id);
    const minus = itemEl.querySelector('.cart-list__qty-btn--minus');

    let value = input.value.replace(/\D/g, '');
    value = value === '' ? 1 : Number(value);
    if (value < 1) value = 1;

    input.value = value;
    if (product) product.qty = value;

    minus.disabled = value <= 1;
    renderCart(cart);
    renderSummary(cart);
  });
}
