import updateCartDescr from "./update-descr";

export default function renderSummary(cart, appliedPromo = null) {
  let totalCurrent = 0;
  let totalOld = 0;

  cart
    .filter(product => !product.removed)
    .forEach(product => {
      const price = product.price;
      const oldPrice = product.oldPrice || product.price;
      const qty = product.qty || 1;

      totalCurrent += price * qty;
      totalOld += oldPrice * qty;

      const itemEl = document.querySelector(`.cart-list__item[data-id="${product.id}"]`);
      if (itemEl) {
        const cardTotalEl = itemEl.querySelector(".cart-list__total");
        const cardOldTotalEl = itemEl.querySelector(".cart-list__old-total");

        if (cardTotalEl) {
          cardTotalEl.textContent = `${(price * qty).toLocaleString('ru-RU')} ₽`;
        }

        if (cardOldTotalEl && product.oldPrice) {
          cardOldTotalEl.textContent = `${(oldPrice * qty).toLocaleString('ru-RU')} ₽`;
        }
      }
    });

  // считаем скидки/доставку
  let promoValue = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percent") {
      promoValue = Math.floor(totalCurrent * (appliedPromo.discount / 100));
    } else if (appliedPromo.type === "fixed") {
      promoValue = appliedPromo.discount;
    }
  }

  const action = totalOld - totalCurrent;
  const discount = action + promoValue || 0;
  const delivery = 200;
  const grandTotal = totalCurrent - promoValue + delivery;

  // выводим в summary (aside)
  const summaryTotalEl = document.querySelector(".order-summary-price--total");
  if (summaryTotalEl) summaryTotalEl.textContent = `${totalCurrent.toLocaleString('ru-RU')} ₽`;

  const discountEl = document.querySelector(".order-summary-price--discount");
  if (discountEl) discountEl.textContent =
    action > 0 ? `− ${discount.toLocaleString('ru-RU')} ₽` : "0 ₽";

  const actionEl = document.querySelector(".order-summary-price--action");
  if (actionEl) actionEl.textContent =
    action > 0 ? `− ${action.toLocaleString('ru-RU')} ₽` : "0 ₽";

  const promoEl = document.querySelector(".order-summary-price--promo");
  if (promoEl) promoEl.textContent =
    promoValue > 0 ? `− ${promoValue.toLocaleString('ru-RU')} ₽` : "0 ₽";

  const deliveryEl = document.querySelector(".order-summary-price--delivery");
  if (deliveryEl) deliveryEl.textContent = `${delivery.toLocaleString('ru-RU')} ₽`;

  document.querySelectorAll(".order-summary__summary-price--bold").forEach(el => {
    el.textContent = `${grandTotal.toLocaleString('ru-RU')} ₽`;
  });

  updateCartDescr(cart);

  return {
    totalCurrent,
    action,
    promoValue,
    delivery,
    grandTotal,
    promoCode: appliedPromo ? appliedPromo.code : null
  };
}
