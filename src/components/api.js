const getEvents = async (category) => {
  const response = await fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`, {
      headers: {
        'accept': 'application/json'
      }
  });

  const data = await response.json();
  console.log(data[0].title);
}

export { getEvents };