import { productChange } from './other-products.js';
import { colorChange } from './colors.js';
import { selected } from "../config.js";
import Product from '../Product.js';
import { selectedJoke } from './jokes-api.js';

const add = document.getElementById('add-to-cart');
const product = document.getElementById('product');
const cart = document.getElementById('cart');
const open = document.getElementById('cart-btn');
const close = document.getElementById('close');
const removeBtn = document.querySelectorAll('.remove');
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
  console.log(joker)
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

function remove() {
  const selectedProduct = products.filter((element) => {
    element.id == id;
  })
  console.log(selectedProduct);
}

function removeAllProducts() {
  products = [];
  product.style.display = "none";
}

// function getJoke() {
//   const id = new URLSearchParams(window.location.search).get("id");
//   let result = selectedJoke(id);
//   return `${result}`;
// };

function initCart() {
  add.addEventListener('click', addToCart);
  close.addEventListener('click', closeCart);
  open.addEventListener('click', openCart);
  // removeBtn.addEventListener('click', remove);
  removeAll.addEventListener('click', removeAllProducts);
  setUpSubscribers();
}

export { initCart };