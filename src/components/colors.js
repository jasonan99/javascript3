import Publisher from '../Publisher.js';
import prices from '../config.js';

const colorChange = new Publisher();

function handleColorChange(event) {
  const color = event.currentTarget.dataset.id;
  colorChange.publish(color);
}

function createColors() {
  const colors = document.getElementById('colors')
  const state = prices.shirt;
  let isChecked = false;

  Object.keys(state).forEach((color) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <input data-id="${color}" class="color" type="radio" name="color" ${isChecked ? '' : 'checked'}>
      <label for="${color}">${color}</label>
    `;
    colors.appendChild(div);

    isChecked = true;
  });
}

function initColors() {
  createColors();
  const colorInputs = document.querySelectorAll('.color');
  colorInputs.forEach(col => {
    col.addEventListener('change', handleColorChange);
  });
}

export {
  initColors,
  colorChange,
};