import validateFormInputs from "./validate-form";
import renderSummary from "./render-summary";
import { showOverlay } from "../utils";
import collectDataList from "../data/data";

export default function formSubmit(selector, cart) {
  const form = document.getElementById(selector);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const promoInput = document.querySelector("#promo");
    const promoMessage = document.querySelector(".order-summary__promo-message");
    const promoBtn = document.querySelector(".order-summary__promo-button");
    const submitButton = document.querySelector('.order-summary__promo-btn');

    const cartData = collectDataList(cart);
    const summaryData = renderSummary(cart, window.appliedPromo);

    function clearForm() {
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
        const input = firstError.closest(".form__field")?.querySelector("input, textarea");
        if (input) input.focus();
      }
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload["cart-info"] = cartData;
    payload["summary-data"] = summaryData;

    console.log("Отправляем:", payload);

    setSubmitButtonState(true);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((result) => {
        console.log("Успешно отправлено:", result);
        clearForm();
        showOverlay("Ваш заказ принят!");
        document.querySelector('.order-summary__promo-remove').style.display = 'none';
      })
      .catch((err) => {
        console.error("Ошибка при отправке:", err);
        showOverlay("Что-то пошло не так, попробуйте ещё раз");
      })
      .finally(() => {
        setSubmitButtonState(false);
      });
  });
}
