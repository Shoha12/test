import renderSummary from "./render-summary";
import { cart } from "./cart";

export default function initPromo() {
  const promoInput = document.querySelector('.cart__promo-input');
  const promoBtn = document.querySelector('.cart__promo-button');
  const promoMessage = document.querySelector('.cart__promo-message');
  const promoRow = document.querySelector('.cart__row--promo');

  promoInput.addEventListener('input', () => {
    if (promoInput.value.trim() !== '') {
      promoBtn.classList.add('visible');
    } else {
      promoBtn.classList.remove('visible');
    }
  });

  const promoCodes = {
    B6D9FC: 500,
  };

  let appliedPromo = null;

  promoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const code = promoInput.value.trim().toUpperCase();

    promoMessage.className = 'cart__promo-message';
    appliedPromo = null;

    if (promoCodes[code]) {
      appliedPromo = promoCodes[code];
      renderSummary(cart, appliedPromo);

      promoMessage.textContent = `${code} - купон применен`;
      promoMessage.classList.add('cart__promo--success');
      promoRow.style.display = 'flex';
    } else {
      renderSummary(cart, appliedPromo);

      promoMessage.textContent = `${code} - купон не найден`;
      promoMessage.classList.add('cart__promo--error');
      promoRow.style.display = 'none';
    }
  });
}
