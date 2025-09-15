import validateFormInputs from "./validate-form";
import { collectCartData } from "./render-cart";
import renderSummary from "./render-summary";
import showOverlay from "../utils";

export default function formSubmit(form, cart) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const promoInput = document.querySelector("#promo");
    const promoMessage = document.querySelector(".cart__promo-message");
    const promoBtn = document.querySelector(".cart__promo-button");
    const submitButton = document.querySelector('.cart__promo-btn');

    const cartData = collectCartData(cart);
    const summaryData = renderSummary(cart);

    function clearForm(form, promoInput, promoMessage, promoBtn) {
      if (promoInput) promoInput.value = "";
      if (promoMessage) promoMessage.textContent = "";
      if (promoBtn) promoBtn.classList.remove("visible");
      form.reset();
    }


    const submitButtonText = {
      IDLE: 'Оформить заказ',
      SENDING: 'Оформляю...'
    };

    const setSubmitButtonState = (isDisabled) => {
      submitButton.disabled = isDisabled;
      submitButton.textContent = isDisabled ? submitButtonText.SENDING : submitButtonText.IDLE;
    };

    let valid = validateFormInputs(form);

    if (!valid) {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = firstError
          .closest(".form__field")
          .querySelector("input, textarea");
        if (input) input.focus();
      }
      return;
    }

    const data = new FormData(form);
    data.append("cart-info", JSON.stringify(cartData));
    data.append("summary-data", JSON.stringify(summaryData));

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    setSubmitButtonState(true);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((result) => {
        console.log("Успешно отправлено:", result);
        clearForm(form, promoInput, promoMessage, promoBtn);
        showOverlay("#order-overlay", 'Ваш заказ принят!');
      })
      .catch((err) => {
        console.error("Ошибка при отправке:", err);
        showOverlay("#order-overlay", 'Что-то пошло не так, попробуйте ещё раз');
      })
      .finally(() => {
        setSubmitButtonState(false);
      });
  });
}
