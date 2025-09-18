export default function initAddressSearch() {
  const token = 'fe79d58476db2b061699143532f7c3b8dc2d1766';
  const input = document.getElementById('address');
  const searchBtn = document.getElementById('search-address');
  const suggestionsList = document.getElementById("suggestions");

  let activeIndex = -1;
  async function fetchSuggestions(query) {
    if (!query) return;

    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    suggestionsList.innerHTML = '';
    activeIndex = -1;

    if (data.suggestions.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Адрес не найден";
      li.classList.add("suggestions__item");
      suggestionsList.appendChild(li);
    } else {
      data.suggestions.forEach((suggestion, index) => {
        const li = document.createElement('li');
        li.classList.add('suggestions__item');
        li.textContent = suggestion.value;

        li.addEventListener('click', () => {
          selectSuggestion(suggestion);
        });

        suggestionsList.appendChild(li);
      });
    }

    suggestionsList.style.display = "block";
  }

  function selectSuggestion(suggestion) {
    input.value = suggestion.value;
    suggestionsList.style.display = 'none';

    const lat = suggestion.data.geo_lat;
    const lon = suggestion.data.geo_lon;

    if (lat && lon && window.myPlacemark && window.myMap) {
      window.myPlacemark.geometry.setCoordinates([lat, lon]);
      window.myMap.setCenter([lat, lon], 16);
    }
  }

  function moveActive(delta) {
    const items = suggestionsList.querySelectorAll('.suggestions__item');
    if (!items.length) return;

    activeIndex = (activeIndex + delta + items.length) % items.length;

    items.forEach(el => el.classList.remove('suggestions__item--active'));
    items[activeIndex].classList.add('suggestions__item--active');
  }

  searchBtn.addEventListener('click', () => {
    const query = input.value.trim();
    fetchSuggestions(query);
  });

  input.addEventListener('input', () => {
    const query = input.value.trim();
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      suggestionsList.style.display = "none";
    }
  });

  input.addEventListener('keydown', (e) => {
    const items = suggestionsList.querySelectorAll('.suggestions__item');

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        moveActive(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveActive(-1);
        break;
      case 'Enter':
        if (activeIndex >= 0 && items[activeIndex]) {
          e.preventDefault();
          const text = items[activeIndex].textContent;
          const suggestion = { value: text, data: {} };
          selectSuggestion(suggestion);
        }
        break;
      case 'Escape':
        suggestionsList.style.display = 'none';
        break;
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.style.display = 'none';
    }
  });

  input.addEventListener('blur', (e) => {
    setTimeout(() => {
      if (
        !suggestionsList.contains(document.activeElement) &&
        document.activeElement !== searchBtn
      ) {
        suggestionsList.style.display = 'none';
      }
    }, 150);
  });
}
