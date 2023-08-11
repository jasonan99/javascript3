function formatString(string) {
  if (string) {
    const formatted = string.toLowerCase().replace(/\s/g, "");
    return formatted;
  }
  return "";
}

function generateImages(data) {
  let imagesHTML = "";

  imagesHTML += `<img src="../../images/${formatString(data.color)}${formatString(data.material)}${formatString(data.pot)}.png" alt="">`;
  if (data.pebbles) {
    imagesHTML += `<img src="../../images/${formatString(data.pebbles)}.png" alt="">`;
  }
  if (data.plants) {
    imagesHTML += `<img src="../../images/${formatString(data.plants)}.png" alt="">`;
  }
  if (data.pole) {
    imagesHTML += `<img src="../../images/${formatString(data.pole)}.png" alt="">`;
  }
  imagesHTML += `<img src="../../images/${formatString(data.soil)}.png" alt="">`;
  imagesHTML += `<img src="../../images/${formatString(data.plant)}.png" alt="">`;

  return imagesHTML;
}

function generateInfo(data) {
  let infoHTML = `
    <p>Name: ${data.plant}</p>
    <p>Soil: ${data.soil}</p>
    <p>Pot: ${data.material} ${data.pot}</p>
    <p>Color: ${data.color}</p>
  `;

  if (data.pebbles || data.plants || data.pole) {
    const extras = [data.pebbles, data.plants, data.pole].filter(Boolean).join(", ");
    infoHTML += `<p>Extras: ${extras}</p>`;
  }
  
  return infoHTML;
}

function generateTitle(data, text) {
  const titleHTML = `
    <p>${text}</p>
    <h2>${data.plant}!</h2>
  `;

  return titleHTML;
}

export {generateImages, generateInfo, generateTitle, formatString};