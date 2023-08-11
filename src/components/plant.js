import { hide, updateCustomizeForm } from "./visualizer.js";
import getInfo from "./form.js";
import {generateImages, generateInfo, generateTitle} from "./generate.js";

const form = document.getElementById("form");
const title = document.getElementById("title");
const image = document.getElementById("image");
const info = document.getElementById("info");

let data = {};

function showPlant() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const placement = form.querySelector(
      'input[name="placement"]:checked',
    ).value;
    const sunlight = form.querySelector('input[name="sunlight"]:checked').value;
    const pets = form.querySelector('input[name="pets"]:checked').value;
    const watering = form.querySelector('input[name="watering"]:checked').value;
    const style = form.querySelector('input[name="style"]:checked').value;
    const extras = Array.from(
      form.querySelectorAll('input[name="extras"]:checked'),
    ).map((input) => input.value);

    data = getInfo(placement, sunlight, pets, watering, style, extras);

    const titleHTML = generateTitle(data, "The perfect plant for you is...");
    title.innerHTML = titleHTML;

    const imagesHTML = generateImages(data);
    image.innerHTML = imagesHTML;

    const infoHTML = generateInfo(data);
    info.innerHTML = infoHTML;

    info.innerHTML += `<button id="customize">Customize!</button>`;
    info.innerHTML += `<button class="hidden" id="check">Check store availability</button>`;
    info.innerHTML += `<button class="hidden" id="back">Back to customization</button>`;

    hide();
    updateCustomizeForm();
  });
}

export { showPlant, data } ;
