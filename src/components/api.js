import { createEvent } from './events.js';
import { selectedCategory } from './categories.js';
import eventCache from './cache.js';

const content = document.getElementById('content');

const getEvents = async (category) => {
  selectedCategory();

  if (eventCache[category]) {
    displayEvents(eventCache[category]);
  } else {
    const response = await fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`, {
      headers: {
        'accept': 'application/json'
      }
    });

    const data = await response.json();
    eventCache[category] = data;

    displayEvents(data);
  }
};

const displayEvents = (data) => {
  content.innerHTML = '';

  data.forEach(e => {
    const eventHTML = createEvent(e);
    content.innerHTML += eventHTML;
  });
};

export { getEvents };