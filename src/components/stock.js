import { formatString } from "./generate.js";
import { key } from "../data.js";

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    });
}

function stockStatus(stock) {
  if (stock === 0) {
    return `One of the items in your order is out of stock.<br> Please check the inventory alerts.`;
  }
  if (stock < 10) {
    return `One of the items in your order has<br> limited stock. Order soon!`;
  }
  return "In stock";
}

function getStock(data) {
  const plant = formatString(data.plant);
  const soil = formatString(data.soil);
  const pot = `${formatString(data.color)}${formatString(data.material)}${formatString(data.pot)}`;

  const apiUrlPlant = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/plant/${key[plant]}`;
  const apiUrlSoil = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/soil/${key[soil]}`;
  const apiUrlPot = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/pot/${key[pot]}`;

  const promises = [
    fetchData(apiUrlPlant),
    fetchData(apiUrlSoil),
    fetchData(apiUrlPot)
  ];

 Promise.all(promises)
  .then(dataArray => {
    const [plantData, soilData, potData] = dataArray;
    const plantStockStatus = stockStatus(plantData.stock);
    const soilStockStatus = stockStatus(soilData.stock);
    const potStockStatus = stockStatus(potData.stock);

    const stock = document.getElementById("stock");
    const alerts = document.getElementById("alerts");

    let message = '';
    let messageClass = '';

    if (
      plantStockStatus ===
        `One of the items in your order is out of stock.<br> Please check the inventory alerts.` ||
      soilStockStatus ===
        `One of the items in your order is out of stock.<br> Please check the inventory alerts.` ||
      potStockStatus ===
        `One of the items in your order is out of stock.<br> Please check the inventory alerts.`
    ) {
      message = `One of the items in your order is out of stock.<br> Please check the inventory alerts.`;
      messageClass = 'red-bg';
    } else if (
      plantStockStatus !== 'In stock' ||
      soilStockStatus !== 'In stock' ||
      potStockStatus !== 'In stock'
    ) {
      message = `One of the items in your order has<br> limited stock. Order soon!`;
      messageClass = 'yellow-bg';
    } else {
      message = 'In stock';
      messageClass = 'green-bg';
    }
  
    stock.innerHTML = `<p class="${messageClass}">${message}</p>`;

    
    const alertMessages = [];

    if (plantStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.`) {
      alertMessages.push(`<p class="red-bg">${data.plant} is out of stock.<br> Please select a different plant.</p>`);
    }
    if (soilStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.`) {
      alertMessages.push(`<p class="red-bg">${data.soil} is out of stock.<br> Please select a different soil.</p>`);
    }
    if (potStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.`) {
      alertMessages.push(`<p class="red-bg">${data.color} ${formatString(data.material)} ${data.pot} is out of stock.<br> Please select a different pot.</p>`);
    }
    if (plantStockStatus === `One of the items in your order has<br> limited stock. Order soon!`) {
      alertMessages.push(`<p class="yellow-bg">${data.plant}<br> Only ${plantData.stock} items left in stock!</p>`);
    }
    if (soilStockStatus === `One of the items in your order has<br> limited stock. Order soon!`) {
      alertMessages.push(`<p class="yellow-bg">${data.soil}<br> Only ${soilData.stock} items left in stock!</p>`);
    }
    if (potStockStatus === `One of the items in your order has<br> limited stock. Order soon!`) {
      alertMessages.push(`<p class="yellow-bg">${data.color} ${formatString(data.material)} ${data.pot}<br> Only ${potData.stock} items left in stock!</p>`);
    }
    if (plantStockStatus === "In stock") {
      alertMessages.push(`<p class="green-bg">In stock<br> ${data.plant}</p>`);
    }
    if (soilStockStatus === "In stock") {
      alertMessages.push(`<p class="green-bg">In stock<br> ${data.soil}</p>`);
    }
    if (potStockStatus === "In stock") {
      alertMessages.push(`<p class="green-bg">In stock<br> ${data.color} ${formatString(data.material)} ${data.pot}</p>`);
    }
    
    alerts.innerHTML = alertMessages.join('');

    const orderButton = document.getElementById("order-button");
    const accordionContainer = document.querySelectorAll("#accordion-container");
    const price = document.getElementById("price");

    if (
      plantStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.` ||
      soilStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.` ||
      potStockStatus === `One of the items in your order is out of stock.<br> Please check the inventory alerts.`) {
      orderButton.disabled = true;
    } else {
      orderButton.disabled = false;
      accordionContainer.forEach(container => {
        container.classList.remove("hidden");
      });
      price.classList.remove("hidden");
    }
  })
  .catch(error => {
    throw new Error('Error fetching data:', error);
  });
}

export default getStock;
