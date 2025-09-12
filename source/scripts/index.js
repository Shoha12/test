/* в этот файл добавляет скрипты*/

import initMap from './map/map';
import initAddressSearch from './map/adress-search';
import { cart } from './form/cart';
import renderCart from './form/render-cart';
import renderSummary from './form/render-summary';
import initPromo from './form/promo';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initAddressSearch();
  renderCart(cart);
  renderSummary(cart);
  initPromo();
});
