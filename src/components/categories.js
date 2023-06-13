import { getEvents } from './api.js';

function selectedCategory() {
  const categories = document.querySelectorAll('.category');
  categories.forEach(function(category) {
    category.addEventListener('click', function(e) {
      categories.forEach(function(btn) {
        btn.classList.remove('selected');
      });

      category.classList.add('selected');

      let categoryFormatted = category.innerHTML.toLowerCase();
      getEvents(categoryFormatted);
    });
  });
}

export { selectedCategory };