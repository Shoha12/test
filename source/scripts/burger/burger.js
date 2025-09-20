import { createOverlay } from "../utils";

export default function initBurger() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobile");
  const closeBtn = mobileMenu.querySelector(".mobile-menu__close");

  burger.addEventListener("click", () => {
    const overlay = createOverlay();
    overlay.className = "overlay"
    overlay.classList.add("overlay--active");
    document.body.appendChild(overlay);

    mobileMenu.classList.add("active");
    closeBtn.classList.add("mobile-menu__close--active");
    document.body.classList.add("body--noscroll");

    overlay.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      overlay.remove();
      closeBtn.classList.remove("mobile-menu__close--active");
      document.body.classList.remove("body--noscroll");
      overlay.classList.remove("overlay--active");
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      overlay.remove();
      closeBtn.classList.remove("mobile-menu__close--active");
      document.body.classList.remove("body--noscroll");
    }, { once: true });
  });
}
