import config from '../config.js';
import Publisher from '../Publisher.js';
const wrap = document.getElementById('other-products-wrap');
const img = document.getElementById('main-img');

const productChange = new Publisher();

function handleProductChange(event) {
  productChange.publish(event.currentTarget.dataset.productid);
  initProducts();
}

function initProducts() {
  const products = Object.keys(config);
  wrap.innerHTML = '';
  products.forEach((prod) => {
    const btn = document.createElement('button');
    btn.classList.add('other-products__btn');
    btn.dataset.productid = prod;
    btn.addEventListener('click', handleProductChange);
    img.src !== `http://127.0.0.1:5500/images/product-${prod}-white.jpg`
    ? (btn.innerHTML = `<img src="../images/product-${prod}-white.jpg" alt="">`)
    : (btn.style.display = 'none');
    wrap.appendChild(btn);
  });
}

export {
  initProducts,
  productChange,
};