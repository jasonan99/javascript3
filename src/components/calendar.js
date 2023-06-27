function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calendar() {
  const calendarContainer = document.getElementById('calendar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentMonthYear = document.getElementById('currentMonthYear');
  const currentDate = new Date();

  function generateCalendar(month, year) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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
      th.textContent = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][i];
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
  }

  function highlightEventDates(month, year) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const going = JSON.parse(localStorage.getItem('going')) || [];
    const interested = JSON.parse(localStorage.getItem('interested')) || [];
  
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
        day.style.backgroundColor = 'green';
      } else if (hasInterested) {
        day.style.backgroundColor = 'yellow';
      }
    });
  } 

  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

  prevBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });

  nextBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });
}

export { calendar, formatDate };
