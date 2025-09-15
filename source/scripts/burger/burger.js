export default function initBurger() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobile");
  const closeBtn = mobileMenu.querySelector(".mobile-menu__close");
  const menuList = document.querySelector(".menu-list");

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    closeBtn.classList.add("mobile-menu__close--active");

    const mobileMenuList = mobileMenu.querySelector(".mobile-menu__list.menu-list");
    if (mobileMenuList && menuList) {
      mobileMenuList.innerHTML = "";

      menuList.querySelectorAll(".menu-list__item").forEach((item) => {
        const clone = item.cloneNode(true);

        clone.classList.add("menu-list__item--mobile");

        const link = clone.querySelector(".menu-list__link");

        if (link) {
          link.classList.add("menu-list__link--mobile");
        }

        mobileMenuList.appendChild(clone);
      });
    }
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    closeBtn.classList.remove("mobile-menu__close--active");
  });
}
