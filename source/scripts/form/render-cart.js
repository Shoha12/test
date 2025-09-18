import {pluralize} from '../utils';

export default function initCart(cart) {
  const items = document.querySelectorAll('.cart-list__item');

  items.forEach(item => {
    const id = Number(item.dataset.id);
    const product = cart.find(p => p.id === id);

    if (!product) return;

    const oldPrice = item.querySelector('.cart-list__old-price');
    const currentPrice = item.querySelector('.cart-list__price');
    const oldTotal = item.querySelector('.cart-list__old-total');
    const currentTotal = item.querySelector('.cart-list__total');
    const qty = item.querySelector('.cart-list__qty-input');

    if (oldPrice && product.oldPrice) {
      oldPrice.textContent = product.oldPrice.toLocaleString('ru-RU') + ' ₽';
    }

    if (currentPrice) {
      currentPrice.textContent = product.price.toLocaleString('ru-RU') + ' ₽';
    }

    if (qty) {
      qty.value = product.qty;
    }

    if (oldTotal && product.oldPrice) {
      oldTotal.textContent = (product.qty * product.oldPrice).toLocaleString('ru-RU') + ' ₽';
    }

    if (currentTotal) {
      currentTotal.textContent = (product.qty * product.price).toLocaleString('ru-RU') + ' ₽';
    }
  });

  const totalQty = cart.reduce((acc, p) => acc + p.qty, 0);
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  const summaryPriceEl = document.querySelector('.cart__summary-price');
  if (summaryPriceEl) {
    summaryPriceEl.textContent = totalPrice.toLocaleString('ru-RU') + ' ₽';
  }

  const descrEl = document.querySelector('.cart__descr');
  if (descrEl) {
    const word = pluralize(totalQty, 'товар', 'товара', 'товаров');
    descrEl.innerHTML = `${totalQty} ${word} <br> на сумму <span class="cart__summary-price">${totalPrice.toLocaleString('ru-RU')}\u00A0₽</span>`;
  }

  return cart.map(p => ({
    id: p.id,
    qty: p.qty,
    price: p.price,
    oldPrice: p.oldPrice || null,
    total: p.price * p.qty
  }));
}
