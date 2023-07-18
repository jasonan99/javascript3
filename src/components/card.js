import getInfo from "./plant.js";

const form = document.getElementById('form');
const title = document.getElementById('title');
const image = document.getElementById('image');
const info = document.getElementById('info');

function formatString(string) {
  if (string) {
    const formatted = string.toLowerCase().replace(/\s/g, '');
    return formatted;
  }
  return '';
}

function showCard() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let imagesHTML = '';

    const placement = form.querySelector('input[name="placement"]:checked').value;
    const sunlight = form.querySelector('input[name="sunlight"]:checked').value;
    const pets = form.querySelector('input[name="pets"]:checked').value;
    const watering = form.querySelector('input[name="watering"]:checked').value;
    const style = form.querySelector('input[name="style"]:checked').value;
    const extras = Array.from(form.querySelectorAll('input[name="extras"]:checked')).map(input => input.value);

    const data = getInfo(placement, sunlight, pets, watering, style, extras);

    title.innerHTML=`
      <p>The perfect plant for you is...</p>
      <h2>${data.plant}!</h2>
    `

    if (data.material || data.pot) {
      imagesHTML += `<img src="../../images/${formatString(data.material)}${formatString(data.pot)}.png" alt="">`;
    }
    if (data.pebbles) {
      imagesHTML += `<img src="../../images/${formatString(data.pebbles)}.png" alt="">`;
    }
    if (data.plants) {
      imagesHTML += `<img src="../../images/${formatString(data.plants)}.png" alt="">`;
    }
    if (data.pole) {
      imagesHTML += `<img src="../../images/${formatString(data.pole)}.png" alt="">`;
    }
    if (data.soil) {
      imagesHTML += `<img src="../../images/${formatString(data.soil)}.png" alt="">`;
    }
    if (data.plant) {
      imagesHTML += `<img src="../../images/${formatString(data.plant)}.png" alt="">`;
    }

    image.innerHTML = imagesHTML;

    info.innerHTML = `
    <p>Name: ${data.plant}</p>
    <p>Soil: ${data.soil}</p>
    <p>Pot: ${data.pot}</p>
    <p>Color: ${data.color}</p>
    ${data.pebbles || data.plants || data.pole ? `<p>Extras: ${[data.pebbles, data.plants, data.pole].filter(Boolean).join(', ')}</p>` : ''}
  `;  
  });
}

export default showCard;
