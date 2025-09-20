function createOverlay() {
  const template = document.getElementById("overlay-template");
  return template.content.cloneNode(true).firstElementChild;
}

function showOverlay(message = "") {
  const overlay = document.createElement("div");
  overlay.className = "overlay overlay--active";

  const modal = document.createElement("div");
  modal.className = "overlay__content";
  modal.innerHTML = `
    <h2 class="overlay__message">${message}</h2>
    <button class="overlay__close" type="button">Закрыть</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  document.body.classList.add("body--noscroll");

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest(".overlay__close")) {
      overlay.remove();
      document.body.classList.remove("body--noscroll");
    }
  });
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

const formatPrice = (num) => new Intl.NumberFormat('ru-RU').format(num);

function getItemWord(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return 'товаров';
  }
  if (mod10 === 1) {
    return 'товар';
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return 'товара';
  }
  return 'товаров';
}

export { pluralize, formatPrice, showOverlay, createOverlay, getItemWord };
