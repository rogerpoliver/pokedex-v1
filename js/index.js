const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon);

  pokemonName.innerHTML = data ? data.name : 'Not Found'
  pokemonNumber.innerHTML = data ? data.id : ''
  pokemonImage.setAttribute(
    "src",
    data.sprites.versions["generation-v"]["black-white"].animated.front_default
  );
  input.value = "";
  searchPokemon = data.id;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  if (searchPokemon < 649) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }});

renderPokemon(searchPokemon)