export default function initBurger() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu-list");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("menu-list--open");
  });
}
