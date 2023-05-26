const generateRandomJoke = async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'accept': 'application/json'
    }
  });

  const data = await response.json();
  return data;
};

const searchJoke = async (keyword) => {
  const response = await fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
      headers: {
        'accept': 'application/json'
      }
  });

  const data = await response.json();
  return data.results
}

const selectedJoke = async (id) => {
  const response = await fetch(`https://icanhazdadjoke.com/j/${id}`, {
      headers: {
        'accept': 'application/json'
      }
  });
  
  const data = await response.json();
  return data.joke
}

export { 
  generateRandomJoke, 
  searchJoke, 
  selectedJoke 
};