export default function initAddressSearch() {
  const token = 'fe79d58476db2b061699143532f7c3b8dc2d1766';
  const input = document.getElementById('address');
  const searchBtn = document.getElementById('search-address');
  const suggestionsList = document.getElementById("suggestions");

  searchBtn.addEventListener('click', async () => {
    const query = input.value.trim();

    if(!query) return;


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

    if(data.suggestions.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Адрес не найден";
      suggestionsList.appendChild(li);
    } else {

      data.suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.textContent = suggestion.value;

        li.addEventListener('click', () => {
          input.value = suggestion.value;
          suggestionsList.style.display = 'none';

          const lat = suggestion.data.geo_lat;
          const lon = suggestion.data.geo_lon;

          if (lat && lon && window.myPlacemark && window.myMap) {
            window.myPlacemark.geometry.setCoordinates([lat, lon]);
            window.myMap.setCenter([lat, lon], 16);
          }
        });
        suggestionsList.appendChild(li);
      });
    }
    suggestionsList.style.display = "block";
  });
}
