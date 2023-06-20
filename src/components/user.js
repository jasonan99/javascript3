function showEvents(category) {
  const eventsContainer = document.getElementById('user-content');
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
    showEvents(category);
  });
});

export { showEvents };