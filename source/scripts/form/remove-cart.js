const originalTemplates = {};

export default function initRemoveCart(cart) {
  const cartList = document.querySelector('.cart-list');

  cart.forEach(item => {
    const el = document.querySelector(`.cart-list__item[data-id="${item.id}"]`);
    if (el) {
      originalTemplates[item.id] = el.innerHTML;
    }
  });

  cartList.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const itemEl = actionBtn.closest(".cart-list__item");
    const id = Number(itemEl.dataset.id);
    const product = cart.find(p => p.id === id);

    if (!product) return;

    switch (action) {
      case "remove":
        product.removed = true;
        itemEl.classList.add('cart-list__item--removed');
        itemEl.innerHTML = `
          <div class="cart-list__divider">
              <div class="cart-list__placeholder">
                <span class="cart-list__placeholder-text">
                  Товар <span class="cart-list__placeholder-text--bold">${product.title}</span> был удалён из корзины.
                </span>
                <button type="button" class="cart-list__remove cart-list__remove-final" data-action="remove-final" aria-label="Удалить окончательно">
                  <svg class="cart-list__icon">
                    <use href="icons/stack.svg#close"></use>
                  </svg>
                </button>
            </div>
            <button type="button" data-action="restore" class="cart-list__restore">Восстановить</button>
          </div>
        `;
        break;

      case "restore":
        product.removed = false;
        itemEl.innerHTML = originalTemplates[id];
        itemEl.classList.remove('cart-list__item--removed')
        break;

      case "remove-final":
        cart.splice(cart.indexOf(product), 1);
        itemEl.remove();
        break;
    }
  });
}
