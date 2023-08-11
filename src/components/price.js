import { total } from "../data.js";
import { formatString } from "./generate.js";

const price = document.getElementById("price");
const breakdown = document.getElementById("breakdown");

function getFormattedExtraName(extra) {
  if (extra === 'mosspole') {
    return 'Moss pole';
  } 
  
  if (extra === 'pebbles') {
    return 'Pebbles';
  } 
  
  if (extra === 'smallerplants') {
    return 'Smaller plants';
  }

  return extra;
}

function getPrice(data) {
  const plantData = formatString(data.plant);
  const potData = `${formatString(data.color)}${formatString(data.material)}${formatString(data.pot)}`;
  const soilData = formatString(data.soil);

  let totalPrice = total.plant[plantData] + total.pot[potData] + total.soil[soilData];
  breakdown.innerHTML = `
    <p class="breakdown">${data.plant}: $${total.plant[plantData]}</p>
    <p class="breakdown">${data.color} ${formatString(data.material)} ${data.pot}: $${total.pot[potData]}</p>
    <p class="breakdown">${data.soil}: $${total.soil[soilData]}</p>
  `

  if (data.extras) {
    data.extras.forEach((extra) => {
      if (total[extra]) {
        totalPrice += total[extra];
        breakdown.innerHTML += `<p class="breakdown">${getFormattedExtraName(extra)}: $${total[extra]}</p>`;
      }
    });
  }

  price.innerHTML = `$${totalPrice.toFixed(2)}`;
  breakdown.innerHTML += `<p>Total: $${totalPrice.toFixed(2)}</p>`
}

export default getPrice;
