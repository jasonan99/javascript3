import getInfo from "./info.js";
import getPrice from "./price.js";
import getStock from "./stock.js";

function checkStock(data, next) {
  getStock(data);

  const stockAlerts = document.getElementById('alerts').innerHTML;

  if (stockAlerts.includes('out of stock') || stockAlerts.includes('limited stock')) {
    const orderButton = document.getElementById('order-button');
    orderButton.disabled = true;
    return;
  }

  next();
}

function handleOrder(orderData) {
  checkStock(orderData, () => {
    getPrice(orderData);
    getInfo(orderData);
  });
}

export default handleOrder;