export default function initMap() {
  window.ymaps.ready(() => {
    window.myMap = new window.ymaps.Map('map', {
      center: [59.9386, 30.3141],
      zoom: 12,
      controls: [],
      suppressMapOpenBlock: true
    });

    window.myPlacemark = new window.ymaps.Placemark(
      [59.9386, 30.3141],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: 'images/map-pin.png',
        iconImageSize: [26, 37],
        iconImageOffset: [-13, -37],
        draggable: true
      }
    );

    window.myMap.geoObjects.add(window.myPlacemark);

    const addressField = document.getElementById('address');

    function getAddress(coords) {
      window.ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject.getAddressLine();
        if (addressField) {
          addressField.value = address;
        }
      });
    }

    window.myPlacemark.events.add('dragend', () => {
      const coords = window.myPlacemark.geometry.getCoordinates();
      getAddress(coords);
    });

    window.myMap.events.add('click', (e) => {
      const coords = e.get('coords');
      window.myPlacemark.geometry.setCoordinates(coords);
      getAddress(coords);
    });
  });
}
