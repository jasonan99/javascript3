import { saveEvent } from './localStorage.js';
import { formatDate } from './calendar.js';

function generateUniqueId() {
  return Date.now().toString();
}

const createEvent = (event) => {
  const eventId = generateUniqueId();

  const priceFormatted = event.price === 0 ? 'Free' : event.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const date = new Date(event.date);
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedDates = formatDate(date);

  const eventHtml = `
  <div class="events-card" id="${eventId}" data-event-date="${formattedDates}">
      <img class="events-card_img" src="${event.image}" alt="">
      <button class="favorites" data-event-id="${eventId}" data-event-type="favorites"></button>
      <div class="events-card_info">
        <h2>${event.title}</h2>
        <p class="date">${formattedDate}</p>
        <p>${event.location.address} - ${event.location.city}, ${event.location.state}</p>
        <p>${priceFormatted}</p>
      </div>
      <div class="events-card_btn">
        <button class="btn interested" data-event-id="${eventId}" data-event-type="interested">Interested</button>
        <button id="go" class="btn going" data-event-id="${eventId}" data-event-type="going">Going!</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const eventElement = document.getElementById(eventId);

    const favoritesButton = eventElement.querySelector('.favorites');
    favoritesButton.addEventListener('click', () => {
      const eventId = favoritesButton.getAttribute('data-event-id');
      saveEvent('favorites', eventId);

      let isFavorite = false;
      isFavorite = !isFavorite;

      if (isFavorite) {
        favoritesButton.style.background = "url(../images/icons/favorite-filled.png)";
      } else {
        favoritesButton.style.background = "url(../images/icons/favorite.png)";
      }
    });

    const interestedButton = eventElement.querySelector('.interested');
    interestedButton.addEventListener('click', () => {
      const eventId = interestedButton.getAttribute('data-event-id');
      saveEvent('interested', eventId);

      interestedButton.style.display = 'none';
      const goingButton = eventElement.querySelector('.going');
      goingButton.style.minWidth = '250px';

      goingButton.addEventListener('click', () => {
        const eventId = goingButton.getAttribute('data-event-id');
        let events = JSON.parse(localStorage.getItem('interested')) || [];
        events = events.filter((storedEvent) => storedEvent.id !== eventId);
        localStorage.setItem('interested', JSON.stringify(events));
      });

      if (!eventElement.querySelector('.going-message')) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = 'You are interested in going.';
        messageParagraph.classList.add('going-message');
        eventElement.appendChild(messageParagraph);

        const changeMindAnchor = document.createElement('button');
        changeMindAnchor.textContent = 'Changed your mind?';
        changeMindAnchor.classList.add('change-mind');
        eventElement.appendChild(changeMindAnchor);
        changeMindAnchor.addEventListener('click', () => {
          interestedButton.style.display = '';
          goingButton.style.minWidth = '115px';
          eventElement.removeChild(messageParagraph);
          eventElement.removeChild(changeMindAnchor);
        });
      }
    });

    const goingButton = eventElement.querySelector('.going');
    goingButton.addEventListener('click', () => {
      const eventId = goingButton.getAttribute('data-event-id');
      saveEvent('going', eventId);

      goingButton.style.display = 'none';
      const interestedButton = eventElement.querySelector('.interested');
      interestedButton.style.display = 'none';

      if (!eventElement.querySelector('.going-message')) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = 'You are going to this event!';
        messageParagraph.classList.add('going-message');
        eventElement.appendChild(messageParagraph);

        const changeMindAnchor = document.createElement('button');
        changeMindAnchor.textContent = 'Changed your mind?';
        changeMindAnchor.classList.add('change-mind');
        eventElement.appendChild(changeMindAnchor);

        changeMindAnchor.addEventListener('click', () => {
          messageParagraph.style.display = 'none';
          changeMindAnchor.style.display = 'none';

          interestedButton.style.display = 'block';
          goingButton.style.display = 'block';

          let events = JSON.parse(localStorage.getItem('going')) || [];
          events = events.filter((storedEvent) => storedEvent.id !== eventId);
          localStorage.setItem('going', JSON.stringify(events));
        });
      }
    });
  }, 0);

  return eventHtml;
};

export { createEvent };
