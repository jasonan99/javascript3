import {productChange} from './other-products.js';
import { colorChange } from './colors.js';
import { selected } from '../config.js';
import prices from '../config.js';

const image = document.getElementById('main-img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const joke = document.getElementById('main-joke');
let state = selected;

function handleProductChange(product) {
  image.setAttribute('src', `../images/product-${product}-${state.color}.jpg`);
  state.product = product;
}

function handleColorChange(color) {
  joke.classList.remove(`with-${state.color}-img`);
  image.setAttribute('src', `../images/product-${state.product}-${color}.jpg`);
  joke.classList.add(`with-${color}-img`);
  state.color = color;
}

function render() {
  image.setAttribute('src', `../images/product-${state.product}-${state.color}.jpg`)
  title.innerHTML = `${state.color} ${state.product} with joke`;
  price.innerHTML = `${prices[state.product][state.color]}`;
}

function setUpSubscribers() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

function initVisualizer() {
  render();
  setUpSubscribers();
}

export {
  initVisualizer
};