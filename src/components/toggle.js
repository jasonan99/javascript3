function toggle() {
  const colorToggle = document.getElementById('colorToggle');
  const potColors = document.getElementById('pot_colors');

  potColors.style.display = 'none';

  colorToggle.addEventListener('change', () => {
      if (colorToggle.checked) {
          potColors.style.display = 'block';
      } else {
          potColors.style.display = 'none';
      }
  });
}

export default toggle;