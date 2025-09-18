export default function collectDataList(cart, appliedPromo = null) {
  const data = {};

  data.cart = cart.map(p => ({
    id: p.id,
    qty: p.qty,
    price: p.price,
    oldPrice: p.oldPrice || null,
    total: p.price * p.qty
  }));

  data.options = [];
  document.querySelectorAll('.cart-list__item').forEach(item => {
    const id = item.dataset.id;
    const size = item.querySelector(`input[name="size-${id}"]:checked`);
    const color = item.querySelector(`input[name="color-${id}"]:checked`);

    data.options.push({
      id,
      size: size ? size.value : null,
      color: color ? color.value : null,
    });
  });

  const pickup = document.querySelector('.order-summary__pickup-input');
  data.pickup = pickup ? pickup.checked : false;

  if (appliedPromo) {
    data.promo = appliedPromo;
  }

  return data;
}
