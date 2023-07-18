const builder = {
  setPlant(plant) {
    this.plant = plant;
    return this;
  },

  setSoil(soil) {
    this.soil = soil;
    return this;
  },

  setPot(pot) {
    this.pot = pot;
    return this;
  },

  setMaterial(material) {
    this.material = material;
    return this;
  },

  setColor(color) {
    this.color = color;
    return this;
  },

  withPole(pole) {
    this.includePole = true;
    this.pole = pole;
    return this;
  },

  withPlants(plants) {
    this.includePlants = true;
    this.plants = plants;
    return this;
  },

  withPebbles(pebbles) {
    this.includePebbles = true;
    this.pebbles = pebbles;
    return this;
  },
};

export default builder;
