import builder from "./builder.js";
import { plants } from "../data.js";

const data = {};

function getInfo(placement, sunlight, pets, watering, style, extras) {
  const selectedPlant = plants[placement][pets][watering];

  let pot;

  if (style === "minimalism") {
    pot = "pot";
  } else {
    pot = "pot with decorations";
  }

  builder
    .setPlant(selectedPlant)
    .setSoil(sunlight === "yes" ? "Composted soil" : "Fertilized soil")
    .setPot(pot);

  const plantBuilder = builder.setPlant(selectedPlant);

  if (watering === "overwater") {
    plantBuilder.setSoil("Easy drainage soil").setMaterial("Clay");
  } else {
    plantBuilder
      .setSoil(sunlight === "yes" ? "Composted soil" : "Fertilized soil")
      .setMaterial("Ceramic");
  }

  if (style === "decoration") {
    if (plantBuilder.material === "Clay") {
      plantBuilder.setColor("Blue");
    } else if (plantBuilder.material === "Ceramic") {
      plantBuilder.setColor("Pink");
    }
  } else if (
    (style === "minimalism" || style === "simple") &&
    plantBuilder.material === "Clay"
  ) {
    plantBuilder.setColor("Unpainted");
  } else {
    plantBuilder.setColor("Unpainted");
  }

  data.plant = plantBuilder.plant;
  data.soil = plantBuilder.soil;
  data.material = plantBuilder.material;
  data.pot = plantBuilder.pot;
  data.color = plantBuilder.color;
  
  data.extras = extras;

  if (extras.includes("mosspole")) {
    plantBuilder.withPole("Moss pole");
  }
  if (extras.includes("pebbles")) {
    plantBuilder.withPebbles("Pebbles");
  }
  if (extras.includes("smallerplants")) {
    plantBuilder.withPlants("Mini plants");
  }

  if (plantBuilder.includePole) {
    data.pole = plantBuilder.pole;
  }
  if (plantBuilder.includePlants) {
    data.plants = plantBuilder.plants;
  }
  if (plantBuilder.includePebbles) {
    data.pebbles = plantBuilder.pebbles;
  }

  return data;
}

export default getInfo;
