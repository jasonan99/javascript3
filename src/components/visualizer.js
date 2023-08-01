import { customizeChange, initCustomize } from './customize.js';
import { generateImages, generateInfo } from './generate.js';
import { data } from './plant.js';

const image = document.getElementById("image");
const info = document.getElementById("info");

function updateCustomizeForm() {
  const materialRadios = document.querySelectorAll('input[name="material"]');
  const potRadios = document.querySelectorAll('input[name="pot"]');
  const colorCheckboxes = document.querySelectorAll('input[name="color"]');
  const plantSelect = document.querySelector('[name="plant"]');
  const soilRadios = document.querySelectorAll('input[name="soil"]');
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

  if (data.material) {
    materialRadios.forEach((radio) => {
      radio.checked = radio.value === data.material;
    });
  }

  if (data.pot) {
    potRadios.forEach((radio) => {
      radio.checked = radio.value === data.pot;
    });
  }

  if (data.color) {
    colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = checkbox.value === data.color;
    });
  }

  extrasCheckboxes.forEach((checkbox) => {
    checkbox.checked = data.extras && data.extras.includes(checkbox.value);
  });

  for (let i = 0; i < plantSelect.options.length; i += 1) {
    if (plantSelect.options[i].value === data.plant) {
      plantSelect.selectedIndex = i;
      break;
    }
  }

  soilRadios.forEach((radio) => {
    radio.checked = radio.value === data.soil;
  });
}

function handleCustomizeChange(feature) {
  const updatedData = {
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

  const imagesHTML = generateImages(data);
  const infoHTML = generateInfo(data);

  image.innerHTML = imagesHTML;
  info.innerHTML = infoHTML;

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

function hide() {
  const customizeButton = document.getElementById("customize");
  const plantForm = document.getElementById("plant-form");
  const customizeForm = document.getElementById("customize-form");

  function hidePlantForm() {
    plantForm.classList.add("hidden");
    customizeButton.classList.add("hidden");
    customizeForm.classList.remove("hidden");
  }

  customizeButton.addEventListener("click", hidePlantForm);
}

export { initVisualizer, hide, updateCustomizeForm };
