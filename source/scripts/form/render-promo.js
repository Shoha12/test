import renderSummary from "./render-summary";

export default function initPromo(promo, cart) {
  const promoInput = document.querySelector('.cart__promo-input');
  const promoBtn = document.querySelector('.cart__promo-button');
  const promoMessage = document.querySelector('.cart__promo-message');
  const promoRow = document.querySelector('.cart__row--promo');

  promoInput.addEventListener('input', () => {
    if (promoInput.value.trim() !== '') {
      promoBtn.classList.add('visible');
    } else {
      promoBtn.classList.remove('visible');
      promoMessage.textContent = '';
    }
  });

  promoInput.addEventListener('blur', () => {
    if (promoInput.value.trim() === '') {
      promoBtn.classList.remove('visible');
      promoMessage.textContent = '';
    }
  });

  let appliedPromo = null;

  promoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const code = promoInput.value.trim().toUpperCase();

    promoMessage.className = 'cart__promo-message';
    appliedPromo = null;

    if (promo[code]) {
      const promoData = promo[code];
      let promoValue = 0;

      if (promoData.type === "fixed") {
        promoValue = promoData.discount;
      } else if (promoData.type === "percent") {
        const totalCurrent = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        promoValue = Math.floor(totalCurrent * (promoData.discount / 100));
      }

      appliedPromo = promoValue;
      renderSummary(cart, appliedPromo);

      promoMessage.textContent = `${code} - купон применен`;
      promoMessage.classList.add('cart__promo--success');
      promoRow.style.display = 'flex';
    } else {
      promoMessage.textContent = `${code} - купон не применен`;
      promoMessage.classList.add('cart__promo--error');
      promoRow.style.display = 'flex';
    }
  });
}
