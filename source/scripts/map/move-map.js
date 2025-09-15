function moveMap() {
  const map = document.getElementById('map');
  const contacts = document.querySelector('.form__contacts');
  const form = document.getElementById('form');

  if (window.innerWidth >= 1200) {
    form.insertAdjacentElement('afterend', map);
    console.log('Карта в main');
  } else {
    contacts.appendChild(map);
    console.log('Карта в contacts');
  }

  if (window.myMap) {
    window.myMap.container.fitToViewport();
  }
}

export default function initMove() {
  moveMap();
  window.addEventListener('resize', moveMap);
}
