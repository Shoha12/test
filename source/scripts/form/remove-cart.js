import renderCart from './render-cart';
import renderSummary from './render-summary';

export default function initRemoveCart(cart) {
  const cartList = document.querySelector('.cart-list');

  cartList.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const itemEl = actionBtn.closest(".cart-list__item");
    const id = Number(itemEl.dataset.id);
    const productIndex = cart.findIndex(p => p.id === id);

    if (productIndex === -1) return;
    const product = cart[productIndex];

    switch (action) {
      case "remove":
        product.removed = true;
        break;

      case "restore":
        product.removed = false;
        break;

      case "remove-final":
        cart.splice(productIndex, 1);
        break;
    }

    renderCart(cart);
    renderSummary(cart);
  });
}
