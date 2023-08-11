import { customizeChange, initCustomize } from './customize.js';
import { generateImages, generateInfo, generateTitle } from './generate.js';
import handleOrder from './middleware.js';
import { data } from './plant.js';

const image = document.getElementById("image");
const info = document.getElementById("info");
const title = document.getElementById("title");

let updatedData = {};

function hide() {
  const customizeButton = document.getElementById("customize");
  const plantForm = document.getElementById("plant-form");
  const customizeForm = document.getElementById("customize-form");
  const checkButton = document.getElementById("check");
  const backButton = document.getElementById("back");
  const order = document.getElementById("order");
  const card = document.getElementById("card");

  customizeButton.addEventListener("click", () => {    
    plantForm.classList.add("hidden");
    customizeForm.classList.remove("hidden");
    customizeButton.classList.add("hidden");
    checkButton.classList.remove("hidden");
});

  checkButton.addEventListener("click", () => {
    customizeForm.classList.add("hidden");
    checkButton.classList.add("hidden");
    backButton.classList.remove("hidden");
    order.classList.remove("hidden");
    card.classList.add("left");
  });

  backButton.addEventListener("click", () => {
    checkButton.classList.remove("hidden");
    backButton.classList.add("hidden");
    customizeForm.classList.remove("hidden");
    order.classList.add("hidden");
    card.classList.remove("left");
  });
}

function updateCustomizeForm() {
  const materialRadios = document.querySelectorAll('input[name="material"]');
  const potRadios = document.querySelectorAll('input[name="pot"]');
  const colorCheckboxes = document.querySelectorAll('input[name="color"]');
  const plantSelect = document.querySelector('[name="plant"]');
  const soilRadios = document.querySelectorAll('input[name="soil"]');
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

  function setElementState(elements, property, value) {
    elements.forEach((element) => {
      if (element[property] === value) {
        element.checked = true;
      }
    });
  }
  
  setElementState(materialRadios, 'value', data.material);
  setElementState(potRadios, 'value', data.pot);
  setElementState(soilRadios, 'value', data.soil);  
  setElementState(colorCheckboxes, 'value', data.color);  

  extrasCheckboxes.forEach((checkbox) => {
    checkbox.checked = data.extras && data.extras.includes(checkbox.value);
  });

  for (let i = 0; i < plantSelect.options.length; i += 1) {
    if (plantSelect.options[i].value === data.plant) {
      plantSelect.selectedIndex = i;
      break;
    }
  }

  const defaultData = {
    plant: data.plant,
    soil: data.soil,
    color: data.color,
    pot: data.pot,
    material: data.material,
    extras: [...data.extras],
  };

  handleOrder(defaultData);
}

function handleCustomizeChange(feature) {
  updatedData = {
    ...updatedData,
    plant: feature.plant || data.plant,
    soil: feature.soil || data.soil,
    color: feature.color || data.color,
    pot: feature.pot || data.pot,
    material: feature.material || data.material,
    extras: feature.extras || data.extras,
  };

  Object.assign(data, updatedData);

  image.innerHTML = '';
  info.innerHTML = '';
  title.innerHTML = '';

  const imagesHTML = generateImages(data);
  const infoHTML = generateInfo(data);
  const titleHTML = generateTitle(data, "Here's your customized plant:");

  image.innerHTML = imagesHTML;
  info.innerHTML = infoHTML;
  title.innerHTML = titleHTML;

  info.innerHTML += `<button id="check">Check store availability</button>`;
  info.innerHTML += `<button class="hidden" id="back">Back to customization</button>`;

  const checkButton = document.getElementById("check");
  const backButton = document.getElementById("back");
  const customizeForm = document.getElementById("customize-form");
  const order = document.getElementById("order");
  const card = document.getElementById("card");

  checkButton.addEventListener("click", () => {
    customizeForm.classList.add("hidden");
    checkButton.classList.add("hidden");
    backButton.classList.remove("hidden");
    order.classList.remove("hidden");
    card.classList.add("left");
  });

  backButton.addEventListener("click", () => {
    checkButton.classList.remove("hidden");
    backButton.classList.add("hidden");
    customizeForm.classList.remove("hidden");
    order.classList.add("hidden");
    card.classList.remove("left");
  });

  updateCustomizeForm();
}

function initVisualizer() {
  initCustomize('pot');
  initCustomize('material');
  initCustomize('color');
  initCustomize('plant');
  initCustomize('soil');
  initCustomize('extras');
  customizeChange.subscribe(handleCustomizeChange);
}

export { initVisualizer, hide, updateCustomizeForm };
