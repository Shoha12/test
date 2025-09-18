export default function showOverlay(selector, message = "") {
  const overlay = document.querySelector(selector);
  if (!overlay) return;

  if (message) {
    const messageEl = overlay.querySelector(".order-overlay__message");
    if (messageEl) messageEl.textContent = message;
  }

  overlay.classList.add("active");
  document.body.classList.add("body--noscroll");

  const closeBtn = overlay.querySelector(".order-overlay__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      document.body.classList.remove("body--noscroll");
    }, { once: true });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.classList.remove("body--noscroll");
    }
  }, { once: true });
}

function pluralize(count, one, few, many) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  } else if (mod10 === 1) {
    return one;
  } else if (mod10 >= 2 && mod10 <= 4) {
    return few;
  } else {
    return many;
  }
}

export { pluralize };
