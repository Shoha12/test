/* в этот файл добавляет скрипты*/
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
  const cart = [
    { id: 1, price: 10000, oldPrice: 12000, qty: 2, title:'Утепленная стеганная куртка женская Top Hills' },
    { id: 2, price: 500, qty: 1 , title: 'Вязанная шапка Zolla' },
    { id: 3, price: 3000, oldPrice: 4000, qty: 2 , title:'Утепленная стеганная куртка женская Top Hills'}
  ];

  const promo = {
    "B6D9FC": { discount: 500, type: "fixed" },
    "HELLO10": { discount: 10, type: "percent" }
  };

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
