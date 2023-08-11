const plants = {
  low: {
    toxic: {
      underwater: "Sansevieria",
      overwater: "Peace Lily",
      neither: "Sansevieria",
    },
    notoxic: {
      underwater: "Boston Fern",
      overwater: "Boston Fern",
      neither: "Boston Fern",
    },
  },

  medium: {
    toxic: {
      underwater: "Aglaonema",
      overwater: "Peace Lily",
      neither: "Aglaonema",
    },
    notoxic: {
      underwater: "Monstera",
      overwater: "Peace Lily",
      neither: "Monstera",
    },
  },

  outdoor: {
    toxic: {
      underwater: "Aloe Vera",
      overwater: "Aloe Vera",
      neither: "Aloe Vera",
    },
    notoxic: {
      underwater: "Cactus",
      overwater: "Cactus",
      neither: "Cactus",
    },
  },
};

const total = {
  plant: {
    aglaonema: 12.99,
    aloevera: 5.25,
    bostonfern: 10.25,
    cactus: 8.25,
    monstera: 18.00,
    peacelily: 8.75,
    sansevieria: 5.75,
  },

  pot: {
    unpaintedclaypot: 3.00,
    blueclaypot: 4.00,
    pinkclaypot: 4.00,
    greenclaypot: 4.00,
    purpleclaypot: 4.00,
    unpaintedclaypotwithdecorations: 4.00,
    blueclaypotwithdecorations: 5.00,
    pinkclaypotwithdecorations: 5.00,
    greenclaypotwithdecorations: 5.00,
    purpleclaypotwithdecorations: 5.00,
    unpaintedceramicpot: 5.00,
    blueceramicpot: 6.00,
    pinkceramicpot: 6.00,
    greenceramicpot: 6.00,
    purpleceramicpot: 6.00,
    unpaintedceramicpotwithdecorations: 6.00,
    blueceramicpotwithdecorations: 7.00,
    pinkceramicpotwithdecorations: 7.00,
    greenceramicpotwithdecorations: 7.00,
    purpleceramicpotwithdecorations: 7.00,
  },

  soil: {
    compostedsoil: 3.25,
    fertilizedsoil: 5.00,
    easydrainagesoil: 5.50,
  },

  mosspole: 2.25,
  pebbles: 2.00,
  smallerplants: 3.75,
}

const key = {
  aglaonema: "aglaonema",
  bostonfern: "fern",
  monstera: "monstera",
  peacelily: "peaceLily",
  sansevieria: "sansevieria",
  aloevera: "aloe",
  cactus: "cactus",

  compostedsoil: "composted",
  fertilizedsoil: "fertilized",
  easydrainagesoil: "drainage",
  
  unpaintedclaypot: "clay-simple-unpainted",
  blueclaypot: "clay-simple-blue",
  pinkclaypot: "clay-simple-pink",
  greenclaypot: "clay-simple-green",
  purpleclaypot: "clay-simple-purple",
  unpaintedclaypotwithdecorations: "clay-decorated-unpainted",
  blueclaypotwithdecorations: "clay-decorated-blue",
  pinkclaypotwithdecorations: "clay-decorated-pink",
  greenclaypotwithdecorations: "clay-decorated-green",
  purpleclaypotwithdecorations: "clay-decorated-purple",
  unpaintedceramicpot: "ceramic-simple-unpainted",
  blueceramicpot: "ceramic-simple-blue",
  pinkceramicpot: "ceramic-simple-pink",
  greenceramicpot: "ceramic-simple-green",
  purpleceramicpot: "ceramic-simple-purple",
  unpaintedceramicpotwithdecorations: "ceramic-decorated-unpainted",
  blueceramicpotwithdecorations: "ceramic-decorated-blue",
  pinkceramicpotwithdecorations: "ceramic-decorated-pink",
  greenceramicpotwithdecorations: "ceramic-decorated-green",
  purpleceramicpotwithdecorations: "ceramic-decorated-purple",
}

export { plants, total, key };
