export default function renderSummary(cart, appliedPromo = null) {
  const items = document.querySelectorAll('.cart-list__item');

  let totalCurrent = 0;
  let totalOld = 0;

  items.forEach(item => {
    const priceEl = item.querySelector(".cart-list__price");
    const oldPriceEl = item.querySelector(".cart-list__old-price");
    const qtyInput = item.querySelector(".cart-list__qty-input");

    const price = parseInt(priceEl?.textContent.replace(/\D/g, ""), 10) || 0;
    const oldPrice = parseInt(oldPriceEl?.textContent.replace(/\D/g, ""), 10) || price;
    const qty = parseInt(qtyInput?.value, 10) || 1;

    totalCurrent += price * qty;
    totalOld += oldPrice * qty;
  });

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

  document.querySelector(".order-summary-price--total").textContent =
    `${totalCurrent.toLocaleString('ru-RU')} ₽`;

  document.querySelector(".order-summary-price--discount").textContent =
    action > 0 ? `− ${discount.toLocaleString('ru-RU')} ₽` : "0 ₽";

  document.querySelector(".order-summary-price--action").textContent =
    action > 0 ? `− ${action.toLocaleString('ru-RU')} ₽` : "0 ₽";

  document.querySelector(".order-summary-price--promo").textContent =
    promoValue > 0 ? `− ${promoValue.toLocaleString('ru-RU')} ₽` : "0 ₽";

  document.querySelector(".order-summary-price--delivery").textContent =
    `${delivery.toLocaleString('ru-RU')} ₽`;

  document.querySelectorAll(".order-summary__summary-price--bold").forEach(el => {
    el.textContent = `${grandTotal.toLocaleString('ru-RU')} ₽`;
  });

  return { totalCurrent, action, promoValue, delivery, grandTotal, promoCode: appliedPromo ? appliedPromo.code : null };
}
