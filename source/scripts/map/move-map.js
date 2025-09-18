function moveMapToMain(map, form) {
  if (!map || !form) return;
  if (form.nextElementSibling !== map) {
    form.insertAdjacentElement('afterend', map);
    console.log('Карта в main');
  }
}

function moveMapToContacts(map, contacts) {
  if (!map || !contacts) return;
  if (!contacts.contains(map)) {
    contacts.appendChild(map);
    console.log('Карта в contacts');
  }
}

export default function initMove() {
  const map = document.getElementById('map');
  const contacts = document.querySelector('.form__contacts');
  const form = document.getElementById('form');

  if (!map || !contacts || !form) return;

  const media = window.matchMedia('(min-width: 1200px)');

  const handler = (e) => {
    if (e.matches) {
      moveMapToMain(map, form);
    } else {
      moveMapToContacts(map, contacts);
    }

    if (window.myMap) {
      window.myMap.container.fitToViewport();
    }
  };

  handler(media);

  media.addEventListener('change', handler);
}
