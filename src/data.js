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

export default plants;
