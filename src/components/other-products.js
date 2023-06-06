import config from '../config.js';
import Publisher from '../Publisher.js';
import { selected } from '../config.js';

const wrap = document.getElementById('other-products-wrap');
let state=selected;

const productChange = new Publisher();

function handleProductChange(event) {
  productChange.publish(event.currentTarget.dataset.productid);
  state = selected;
}

function initProducts() {
  const products = Object.keys(config);
  const filteredProducts = products.filter((product) => product !== state.product);

  wrap.innerHTML = '';
  filteredProducts.forEach((prod) => {
    const btn = document.createElement('button');
    btn.classList.add('other-products__btn');
    btn.dataset.productid = prod;
    btn.addEventListener('click', handleProductChange);
    btn.innerHTML = `<img src="../images/product-${prod}-white.jpg" alt="">`;
    wrap.appendChild(btn);
  });
}

export {
  initProducts,
  productChange
};