/* в этот файл добавляет скрипты*/
import { cartData, promoData } from './api/api';
import initCart from './form/render-cart';
import renderSummary from './form/render-summary';
import initQty from './form/render-qty';
import initMap from './map/map';
import initAddressSearch from './map/adress-search';
import moveMap from './map/move-map';
import initRemoveCart from './form/remove-cart';
import initPromo from './form/render-promo';
import formSubmit from './form/form';
import initBurger from './burger/burger';
import initUpButton from './scroll/scroll';
import mask from './matrix/mask';
import checkCommentValue from './form/render-comment';

document.addEventListener('DOMContentLoaded', async () => {

  const promo = await promoData();
  const cart = await cartData();

  initMap();
  initAddressSearch();
  moveMap();
  initBurger();
  initUpButton();
  initCart(cart);
  renderSummary(cart);
  initQty(cart);
  initRemoveCart(cart);
  initPromo(cart, promo);
  formSubmit('form', cart);
  mask('[name="phone"]');
  checkCommentValue();
});
