import Publisher from '../Publisher.js';

const customizeChange = new Publisher();

const arrays = {
  material: document.querySelectorAll('.material'),
  pot: document.querySelectorAll('.pot'),
  plant: document.querySelectorAll('[data-key="plant"]'),
  soil: document.querySelectorAll('.soil'),
  color: document.querySelectorAll('.color')
};

function handleChange(event, key) {
  const { value } = event.target;
  customizeChange.publish({ [key]: value });
}

function initCustomize(arrayKey) {
  const customizeInputs = arrays[arrayKey];
  if (customizeInputs) {
    customizeInputs.forEach((customize) => {
      customize.addEventListener("change", (event) => handleChange(event, arrayKey));
    });
  }
}

export {
  initCustomize,
  customizeChange,
};
