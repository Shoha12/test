import { getItemWord } from "../utils";
import { formatPrice } from "../utils";


export default function updateCartDescr(cart) {
  const descrEl = document.querySelector('.cart__descr');
  if (!descrEl) return;

  const totalQty = cart.reduce((sum, p) => sum + (p.removed ? 0 : p.qty), 0);
  const totalSum = cart.reduce((sum, p) => sum + (p.removed ? 0 : p.price * p.qty), 0);

  descrEl.innerHTML = `
    ${totalQty} ${getItemWord(totalQty)} <br>
    на сумму <span class="cart__summary-price">${formatPrice(totalSum)} ₽</span>
  `;
}
