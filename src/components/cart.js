import { productChange } from './other-products.js';
import { colorChange } from './colors.js';
import { selected } from "../config.js";
import Product from '../Product.js';

const add = document.getElementById('add-to-cart');
const product = document.getElementById('product');
const cart = document.getElementById('cart');
const open = document.getElementById('cart-btn');
const close = document.getElementById('close');
const removeAll = document.getElementById('remove-all');
const joke = document.getElementById('main-joke');

let state = selected;
let products = [];
let id = 0;

function handleProductChange(product) {
  state.product = product;
}

function handleColorChange(color) {
  state.color = color;
}

function setUpSubscribers() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

function addToCart() {
  product.style.display = "block";
  id += 1;
  let joker = joke.innerText;
  const productC = new Product({ product: state.product, color: state.color, joke: `${joker}`, id: id });
  products.push(productC);
  cart.appendChild(productC.render());
  openCart();
}

function openCart() {
  cart.style.display = "block";
}

function closeCart() {
  cart.style.display = "none";
}

function removeAllProducts() {
  cart.innerHTML = '';
  products = [];
  product.style.display = "none";
  regenerateCart();
}

function regenerateCart() {
  cart.innerHTML = `
    <div class="cart-wrap">
      <h2>Cart</h2>
      <button class="cart-btn close-btn" id="close">Close</button>
      <button id="remove-all" class="cart-btn remove-all">Remove all</button>
      <div id="product"></div>
    </div>
  `;

  const closeButton = cart.querySelector('#close');
  closeButton.addEventListener('click', closeCart);

  const removeAllButton = cart.querySelector('#remove-all');
  removeAllButton.addEventListener('click', removeAllProducts);
}

function initCart() {
  add.addEventListener('click', addToCart);
  close.addEventListener('click', closeCart);
  open.addEventListener('click', openCart);
  removeAll.addEventListener('click', removeAllProducts);
  setUpSubscribers();
}

export { initCart };