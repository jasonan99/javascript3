import builder from "./builder.js";
import plants from "../data.js";

const data = {};

function getInfo(placement, sunlight, pets, watering, style, extras) {
  const selectedPlant = plants[placement][pets][watering];

  let pot;

  if (style === 'minimalism') {
    pot = 'pot';
  } else if (style === 'simple') {
    pot = 'pot with decorations';
  } else {
    pot = 'painted pot with decorations';
  }

  builder
    .setPlant(selectedPlant)
    .setSoil(sunlight === 'yes' ? 'Composted soil' : 'Fertilized soil')
    .setPot(pot);

  const plantBuilder = builder.setPlant(selectedPlant);

  if (watering === 'overwater') {
    plantBuilder.setSoil('Easy drainage soil')
      .setMaterial('Clay');
  } else {
    plantBuilder.setSoil(sunlight === 'yes' ? 'Composted soil' : 'Fertilized soil')
      .setMaterial('Ceramic');
  }

  if (style === 'decoration') {
    if (plantBuilder.material === 'Clay') {
      plantBuilder.setColor('Blue');
    } else if (plantBuilder.material === 'Ceramic') {
      plantBuilder.setColor('Pink');
    }
  } else if ((style === 'minimalism' || style === 'simple') && plantBuilder.material === 'Clay') {
    plantBuilder.setColor(plantBuilder.material);
  } else {
    plantBuilder.setColor('Yellow');
  }

  if (extras.includes('moss-pole')) {
    plantBuilder.withPole('Moss pole');
  }
  if (extras.includes('pebbles')) {
    plantBuilder.withPebbles('Pebbles');
  }
  if (extras.includes('smaller-plants')) {
    plantBuilder.withPlants('Mini Plants');
  }

  data.plant = plantBuilder.plant;
  data.soil = plantBuilder.soil;
  data.pot = `${plantBuilder.material} ${plantBuilder.pot}`;
  data.color = plantBuilder.color;
  
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
