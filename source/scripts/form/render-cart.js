import { formatPrice } from "../utils";

export default function initCart(cart) {
  const cartList = document.querySelector('#cart');
  const template = document.getElementById('cart-item-template');

  cartList.innerHTML = '';

  const renderCart = (product) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector(".cart-list__item");
    li.dataset.id = product.id;

    if (product.removed) {
      li.classList.add("cart-list__item--no-grid");
      li.innerHTML = `
        <div class="cart-list__divider">
          <div class="cart-list__placeholder">
            <span class="cart-list__placeholder-text">
              Товар <span class="cart-list__placeholder-text--bold">${product.title}</span> был удалён из корзины.
            </span>
            <button type="button" class="cart-list__remove cart-list__remove-final" data-action="remove-final" aria-label="Удалить окончательно">
              <svg class="cart-list__icon"><use href="icons/stack.svg#close"></use></svg>
            </button>
          </div>
          <button type="button" data-action="restore" class="cart-list__restore">Восстановить</button>
        </div>
      `;
      return li;
    }

    clone.querySelector(".cart-list__title").textContent = product.title;
    clone.querySelectorAll(".cart-list__mean")[0].textContent = product.article;
    clone.querySelectorAll(".cart-list__mean")[1].textContent = product.season;

    const picture = clone.querySelector("picture");
    picture.innerHTML = `
      <source media="(min-width:1200px)" type="image/webp"
        srcset="${product.images.desktop.webp["1x"]} 1x, ${product.images.desktop.webp["2x"]} 2x" width="130" height="160">
      <source media="(min-width:768px)" type="image/webp"
        srcset="${product.images.mobile.webp["1x"]} 1x, ${product.images.mobile.webp["2x"]} 2x">
      <source media="(min-width:1200px)" type="image/png"
        srcset="${product.images.desktop.png["1x"]} 1x, ${product.images.desktop.png["2x"]} 2x" width="130" height="160">
      <source media="(min-width:768px)" type="image/png"
        srcset="${product.images.mobile.png["1x"]} 1x, ${product.images.mobile.png["2x"]} 2x">
      <img class="cart-list__img"
        src="${product.images.mobile.png["1x"]}"
        srcset="${product.images.mobile.png["2x"]} 2x"
        alt="${product.title}" width="90" height="111">
    `;

    const sizesFieldset = clone.querySelector(".cart-list__sizes");
    sizesFieldset.innerHTML = `<legend class="visually-hidden">Выберите размер</legend>`;
    product.sizes.forEach(size => {
      sizesFieldset.innerHTML += `
        <label class="size">
          <input class="visually-hidden" type="radio" name="size-${product.id}" value="${size.value}"
            ${size.checked ? "checked" : ""} ${size.disabled ? "disabled" : ""}>
          <span class="size__btn">${size.value}</span>
        </label>
      `;
    });

    const colorsFieldset = clone.querySelector(".cart-list__colors");
    colorsFieldset.innerHTML = `<legend class="visually-hidden">Выберите цвет</legend>`;
    product.colors.forEach(color => {
      colorsFieldset.innerHTML += `
        <label class="color">
          <input class="visually-hidden" type="radio" name="color-${product.id}" value="${color.value}"
            ${color.checked ? "checked" : ""}>
          <span class="color__wrapper">
            <span class="color__circle color__circle--${color.value}"></span>
          </span>
        </label>
      `;
    });

    const oldPriceEl = clone.querySelector(".cart-list__old-price");
    const priceEl = clone.querySelector(".cart-list__price");
    const qtyInput = clone.querySelector(".cart-list__qty-input");
    const qtyLabel = clone.querySelector("label[for='qty-id']");
    const oldTotalEl = clone.querySelector(".cart-list__old-total");
    const totalEl = clone.querySelector(".cart-list__total");
    const minusBtn = clone.querySelector(".cart-list__qty-btn--minus");

    const qtyId = `qty-${product.id}`;
    qtyInput.id = qtyId;
    qtyLabel.setAttribute("for", qtyId);

    qtyInput.value = product.qty;

    if (product.oldPrice) {
      oldPriceEl.textContent = `${formatPrice(product.oldPrice)} ₽`;
      oldTotalEl.textContent = `${formatPrice(product.oldPrice * product.qty)} ₽`;
    } else {
      oldPriceEl.remove();
      oldTotalEl.remove();
    }

    priceEl.textContent = `${formatPrice(product.price)} ₽`;
    totalEl.textContent = `${formatPrice(product.price * product.qty)} ₽`;

    if (minusBtn) {
      minusBtn.disabled = product.qty <= 1;
    }

    return clone;
  };

  cart.forEach((product) => {
    cartList.append(renderCart(product));
  });

  cartList.addEventListener("change", (e) => {
    const itemEl = e.target.closest(".cart-list__item");
    if (!itemEl) return;

    const id = Number(itemEl.dataset.id);
    const product = cart.find(p => p.id === id);

    if (!product) return;

    if (e.target.name.startsWith("size-")) {
      product.sizes.forEach(s => (s.checked = s.value === e.target.value));
    }

    if (e.target.name.startsWith("color-")) {
      product.colors.forEach(c => (c.checked = c.value === e.target.value));
    }
  });
}
