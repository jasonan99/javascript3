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

let state = selected;
let products = [];

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
  const product = new Product({ product: state.product, color: state.color, joke: 'hola' });
  products.push(product);
  cart.appendChild(product.render());
  openCart();
}

function openCart() {
  cart.style.display = "block";
}

function closeCart() {
  cart.style.display = "none";
}

function removeAllProducts() {
  products = [];
  product.style.display = "none";
}

function initCart() {
  add.addEventListener('click', addToCart);
  close.addEventListener('click', closeCart);
  open.addEventListener('click', openCart);
  removeAll.addEventListener('click', removeAllProducts);
  setUpSubscribers();
}

export { initCart };