import renderCart from './render-cart';
import renderSummary from './render-summary';


export default function initQty(cart) {
  document.querySelectorAll(".cart-list__item").forEach((itemEl) => {
    const id = Number(itemEl.dataset.id);
    const minusBtn = itemEl.querySelector(".cart-list__qty-btn--minus");
    const plusBtn = itemEl.querySelector(".cart-list__qty-btn--plus");

    minusBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.id === id);
      if (product.qty > 1) {
        product.qty--;
        renderCart(cart);
        renderSummary(cart);
      }
    });

    plusBtn.addEventListener("click", () => {
      const product = cart.find((p) => p.id === id);
      product.qty++;
      renderCart(cart);
      renderSummary(cart);
    });
  });
}
