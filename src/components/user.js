import { calendar } from "./calendar.js";

const eventsContainer = document.getElementById('user-content');
const calendarContainer = document.getElementById('calendar-container');

function showEvents(category) {
  eventsContainer.innerHTML = '';

  const events = JSON.parse(localStorage.getItem(category)) || [];

  events.forEach(event => {
    eventsContainer.innerHTML += event.html;
  });
}

  const categoryButtons = document.querySelectorAll('.category');
  categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.toLowerCase();
    if(category !== 'calendar') {
      calendarContainer.style.display = 'none';
      showEvents(category);
    }
    else {
      eventsContainer.innerHTML = '';
      calendarContainer.style.display = 'block';
      calendar();
    }
  });
});

export { showEvents };