import { generateRandomJoke } from "./jokes-api.js";

const randomJoke = ({id, joke}) => {
  const seejoke = document.getElementById('joke');
  const mjoke = document.getElementById('main-joke');
  seejoke.innerHTML = '';
  seejoke.insertAdjacentHTML(
    "beforeend",
    `<a href="./html/products.html?id=${id}">${joke}</a>`
  );
  
  mjoke.innerHTML = '';
  mjoke.insertAdjacentHTML(
    "beforeend",
    `${joke}</p>`
  );
};

const showJoke = () => {
  const generate = document.getElementById('generate');
  generate.addEventListener('click', async () => {
    const joker = await generateRandomJoke();
    randomJoke(joker);
  });
};

export default showJoke;