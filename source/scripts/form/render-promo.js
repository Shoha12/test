import renderSummary from "./render-summary";

export default function initPromo(cart, promo) {
  const promoInput = document.querySelector('.order-summary__promo-input');
  const inputLabel = document.querySelector('.order-summary__promo-label');
  const promoBtn = document.querySelector('.order-summary__promo-button');
  const promoMessage = document.querySelector('.order-summary__promo-message');
  const promoRow = document.querySelector('.order-summary__row--promo');
  const promoRemove = document.querySelector('.order-summary__promo-remove');

  let appliedPromo = null;

  promoInput.addEventListener('input', () => {
    if (promoInput.value.trim() !== '') {
      promoBtn.classList.add('visible');
      promoInput.classList.remove('order-summary__promo-input--error');
      inputLabel.classList.remove('order-summary__promo-label--error');
    } else {
      promoBtn.classList.remove('visible');
      promoMessage.textContent = '';
    }
  });

  promoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const code = promoInput.value.trim().toUpperCase();

    promoMessage.className = 'order-summary__promo-message';
    appliedPromo = null;

    if (promo[code]) {
      appliedPromo = { code, ...promo[code] };
      window.appliedPromo = appliedPromo;

      renderSummary(cart, appliedPromo);

      promoMessage.textContent = `${code} – купон применен`;
      promoMessage.classList.add('order-summary__promo-message--success');
      promoRow.style.display = 'flex';
      promoRemove.style.display = 'inline-block';

    } else {
      renderSummary(cart, null);

      promoMessage.textContent = `${code} – купон не применен`;
      promoMessage.classList.add('order-summary__promo-message--error');
      promoInput.classList.add('order-summary__promo-input--error');
      inputLabel.classList.add('order-summary__promo-label--error');
      promoRow.style.display = 'flex';
      promoRemove.style.display = 'inline-block';
    }
  });

  promoRemove.addEventListener('click', () => {
    appliedPromo = null;
    promoInput.value = '';
    promoMessage.textContent = '';
    promoRow.style.display = 'none';
    promoBtn.classList.remove('visible');
    promoRemove.style.display = 'none';

    renderSummary(cart, null);
  });
}
