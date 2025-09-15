export default function showOverlay(selector, message = "") {
  const overlay = document.querySelector(selector);
  if (!overlay) return;

  if (message) {
    const messageEl = overlay.querySelector(".order-overlay__message");
    if (messageEl) messageEl.textContent = message;
  }

  overlay.classList.add("active");

  const closeBtn = overlay.querySelector(".order-overlay__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
    }, { once: true });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  }, { once: true });
}
