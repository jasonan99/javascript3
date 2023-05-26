import { searchJoke } from "./jokes-api.js";

const getWord = async () => {
  const searchbar = document.getElementById("searchbar").value;
  const jokes = document.getElementById("jokes");
  const result = await searchJoke(searchbar);
  !searchbar ? jokes.innerHTML = `<p class="dad-container--text">Please enter a word in the searchbar!</p>`
  : generateJokes(result);
};

const generateJokes = (data) => {
  const jokes = document.getElementById("jokes");
  jokes.innerHTML = "";
  !data.length ? (jokes.innerHTML = `<p class="dad-container--text">There are no jokes with that word. Try again with a different one!</p>`) 
  :data.forEach((element) =>
    jokes.insertAdjacentHTML(
      "beforeend",
      `<a class="dad-container--text" href="./html/products.html?id=${element.id}">${element.joke}</a>`
  ));
};

const showResults = () => {
  const search = document.getElementById("search");
  search.addEventListener("click", getWord);
};

export default showResults;