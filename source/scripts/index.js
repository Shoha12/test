/* в этот файл добавляет скрипты*/

import initMap from './map/map';
import initAddressSearch from './map/adress-search';
import renderCart from './form/render-cart';
import renderSummary from './form/render-summary';
import initPromo from './form/render-promo';
import { fetchCart } from './api/cart';
import { fetchPromoCodes } from './api/promo';
import initQty from './form/render-qty';
import initRemoveCart from './form/remove-cart';
import formSubmit from './form/form';
import checkCommentValue from './form/render-comment';
import initBurger from './burger/burger';
import initMove from './map/move-map';

document.addEventListener('DOMContentLoaded', async () => {
  const [cart, promo] = await Promise.all([
    fetchCart(),
    fetchPromoCodes()
  ]);

  initMap();
  initAddressSearch();
  renderCart(cart);
  renderSummary(cart);
  initPromo(promo, cart);
  initQty(cart);
  initRemoveCart(cart);
  checkCommentValue();
  const formEl = document.querySelector('#form');
  formSubmit(formEl, cart);
  initBurger();
  initMove();
});
