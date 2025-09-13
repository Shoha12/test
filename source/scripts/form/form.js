import validateFormInputs from "./validate-form";
import { collectCartData } from "./render-cart";
import renderSummary from "./render-summary";


export default function formSubmit(form, cart) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cartData = collectCartData(cart);
    const summaryData = renderSummary(cart);

    let valid = validateFormInputs(form);

    if (!valid) {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = firstError.closest(".form__field").querySelector("input, textarea");
        if (input) input.focus();
      }
      return;
    }

    const data = new FormData(form);
    data.append('cart-info', JSON.stringify(cartData));
    data.append('summary-data', JSON.stringify(summaryData));

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const promoInput = document.querySelector('#promo');
    const promoMessage = document.querySelector('.cart__promo-message');
    if (promoInput) promoInput.value = '';
    if (promoMessage) promoMessage.textContent = '';
    const promoBtn = document.querySelector('.cart__promo-button');
    if(promoBtn) promoBtn.classList.remove('visible')
    form.reset();
  });
}
