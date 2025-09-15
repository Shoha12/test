import renderCart from './render-cart';
import renderSummary from './render-summary';

export default function initQty(cart) {
  const cartList = document.querySelector('.cart-list');

  cartList.addEventListener("click", (e) => {
    const btn = e.target.closest(".cart-list__qty-btn");

    const itemEl = btn.closest(".cart-list__item");
    const id = Number(itemEl.dataset.id);
    const product = cart.find((p) => p.id === id);

    if (btn.classList.contains("cart-list__qty-btn--minus")) {
      if (product.qty > 1) {
        product.qty--;
      }
    }

    if (btn.classList.contains("cart-list__qty-btn--plus")) {
      product.qty++;
    }

    renderCart(cart);
    renderSummary(cart);
  });
}
