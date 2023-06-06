import { productChange } from './other-products.js';
import prices from '../config.js';
import { colorChange } from './colors.js';
import { selectedJoke } from './jokes-api.js';
import { selected } from '../config.js';

const title = document.getElementById('title');
const price = document.getElementById('price');
const joke = document.getElementById('selected-joke');
const mjoke = document.getElementById('main-joke');
let state = selected;

function handleProductChange(product) {
  title.innerHTML = `${state.color} ${product} with joke`;
  price.innerHTML = `${prices[product][state.color]}`;
  state.product = product;
}

function handleColorChange(color) {
  title.innerHTML = `${color} ${state.product} with joke`;
  price.innerHTML = `${prices[state.product][color]}`;
  state.color = color;
}

const getJoke = async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  let result = await selectedJoke(id);
  joke.innerHTML = `Joke: ${result}`;
  mjoke.innerHTML = `${result}`;
};
await getJoke();

function initDetails() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

export {
  initDetails
};