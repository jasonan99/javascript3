import { key } from "../data.js";
import { formatString } from "./generate.js";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getInfo(info) {
  const plant = formatString(info.plant);

  const apiUrl = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${key[plant]}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const description = document.getElementById("description");
      description.innerHTML = `<p class="breakdown">${data.description}</p>`;

      const tips = document.getElementById("tips");
      tips.innerHTML = '';

      Object.entries(data.care).forEach(([tip, tipText]) => {
        tips.innerHTML += `<h3 class="${tip}">${capitalizeFirstLetter(tip)}</h3>`;
        tips.innerHTML += `<p class="tips">${tipText}</p>`;
      });

    })
    .catch(error => {
    throw new Error('Error fetching data:', error);
    });
}

export default getInfo;
