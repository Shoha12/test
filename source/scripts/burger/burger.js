export default function initBurger() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobile");
  const closeBtn = mobileMenu.querySelector(".mobile-menu__close");

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    closeBtn.classList.add("mobile-menu__close--active");
    document.body.classList.add("body--noscroll");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    closeBtn.classList.remove("mobile-menu__close--active");
    document.body.classList.remove("body--noscroll");
  });
}
