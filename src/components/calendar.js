const calendarContainer = document.getElementById('calendar');
const currentMonthYear = document.getElementById('currentMonthYear');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const going = JSON.parse(localStorage.getItem('going')) || [];
const interested = JSON.parse(localStorage.getItem('interested')) || [];

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateCalendar(month, year) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  } else {
    daysInMonth[1] = 28;
  }

  const firstDay = new Date(year, month, 1).getDay();
  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  for (let i = 0; i < 7; i++) {
    const th = document.createElement('th');
    th.textContent = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement('td');
        row.appendChild(cell);
      } else if (date > daysInMonth[month]) {
        break;
      } else {
        const cell = document.createElement('td');
        cell.textContent = date;

        const eventsDate = formatDate(new Date(year, month, date));
        let hasFavorite = false;
        let hasGoing = false;
        let hasInterested = false;

        favorites.forEach(event => {
          if (event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasFavorite = true;
          }
        });

        going.forEach(event => {
          if (event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasGoing = true;
          }
        });

        interested.forEach(event => {
          if (event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasInterested = true;
          }
        });

        if (hasFavorite) {
          cell.style.backgroundColor = 'pink';
          const eventInfo = getEventInfo(eventsDate);
          if (eventInfo) {
            const eventName = eventInfo.title;
            const button = document.createElement('button');
            button.textContent = eventName;
            button.setAttribute('data-event-date', eventsDate);
            button.classList.add("calendar-button")
            cell.appendChild(button);
          }
        } else if (hasGoing) {
          cell.style.backgroundColor = 'lightgreen';
          const eventInfo = getEventInfo(eventsDate);
          if (eventInfo) {
            const eventName = eventInfo.title;
            const button = document.createElement('button');
            button.textContent = eventName;
            button.setAttribute('data-event-date', eventsDate);
            button.classList.add("calendar-button")
            cell.appendChild(button);
          }
        } else if (hasInterested) {
          cell.style.backgroundColor = 'yellow';
          const eventInfo = getEventInfo(eventsDate);
          if (eventInfo) {
            const eventName = eventInfo.title;
            const button = document.createElement('button');
            button.textContent = eventName;
            button.setAttribute('data-event-date', eventsDate);
            button.classList.add("calendar-button")
            cell.appendChild(button);
          }
        }

        row.appendChild(cell);
        date++;
      }
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  calendarContainer.innerHTML = '';
  calendarContainer.appendChild(table);
  currentMonthYear.textContent = months[month] + ' ' + year;

  highlightEventDates(month, year);
  assignButtonEvents();
}

function assignButtonEvents() {
  const calendarDays = calendarContainer.querySelectorAll('tbody td');

  calendarDays.forEach((day) => {
    day.addEventListener('click', () => {
      const eventId = day.querySelector('button[data-event-date]')?.getAttribute('data-event-date');
      if (eventId) {
        showEventCard(eventId);
      }
    });
  });
}

function highlightEventDates(month, year) {

  const days = calendarContainer.querySelectorAll('tbody td');
  days.forEach(day => {
    const dayNumber = parseInt(day.textContent);
    const date = new Date(year, month, dayNumber);
    const eventsDate = formatDate(date);

    let hasFavorite = false;
    let hasGoing = false;
    let hasInterested = false;

    favorites.forEach(event => {
      if (event.html.includes(`data-event-date="${eventsDate}"`)) {
        hasFavorite = true;
      }
    });

    going.forEach(event => {
      if (event.html.includes(`data-event-date="${eventsDate}"`)) {
        hasGoing = true;
      }
    });

    interested.forEach(event => {
      if (event.html.includes(`data-event-date="${eventsDate}"`)) {
        hasInterested = true;
      }
    });

    if (hasFavorite) {
      day.style.backgroundColor = 'pink';
    } else if (hasGoing) {
      day.style.backgroundColor = 'lightgreen';
    } else if (hasInterested) {
      day.style.backgroundColor = 'yellow';
    }
  });
}

function getEventInfo(eventDate) {
  const eventTypes = ['favorites', 'going', 'interested'];

  for (const eventType of eventTypes) {
    const events = JSON.parse(localStorage.getItem(eventType)) || [];
    const event = events.find(event => event.html.includes(`data-event-date="${eventDate}"`));

    if (event) {
      const parser = new DOMParser();
      const eventDoc = parser.parseFromString(event.html, 'text/html');
      const eventNameElement = eventDoc.querySelector('.events-card_info h2');

      if (eventNameElement) {
        const eventName = eventNameElement.textContent;
        return { title: eventName, html: event.html };
      }
    }
  }

  return null;
}

function showEventCard(eventId) {
  const eventInfo = getEventInfo(eventId);

  if (eventInfo) {
    const eventCardContainer = document.getElementById("eventCardContainer");
    eventCardContainer.innerHTML = eventInfo.html;

    const buttons = eventCardContainer.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.style.display = 'none';
    });

    const anchors = eventCardContainer.querySelectorAll('a');
    anchors.forEach((anchor) => {
      anchor.style.display = 'none';
    });

    const favorites = eventCardContainer.querySelectorAll('.favorites');
    favorites.forEach((favorite) => {
      favorite.style.display = 'none';
    });

    const clickedButton = document.querySelector(`button[data-event-date="${eventId}"]`);
    const buttonRect = clickedButton.getBoundingClientRect();
    
    eventCardContainer.style.display = 'block';
    eventCardContainer.classList.add('calendar-card');

    const overlay = document.getElementById("overlay");
    overlay.style.display = 'block';

    overlay.addEventListener("click", hideEventCard);
  }
}

function hideEventCard() {
  const eventCardContainer = document.getElementById("eventCardContainer");
  const overlay = document.getElementById("overlay");

  eventCardContainer.style.display = "none";
  overlay.style.display = "none";

  overlay.removeEventListener("click", hideEventCard);
}

function calendar() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentDate = new Date();

  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

  prevBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });

  nextBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });
  
  const calendarDays = calendarContainer.querySelectorAll('tbody td');
  
  calendarDays.forEach((day) => {
    day.addEventListener('click', () => {
      const eventId = day.querySelector('button[data-event-date]')?.getAttribute('data-event-date');
      if (eventId) {
        showEventCard(eventId);
      }
    });
  });
}

export { calendar, formatDate };
