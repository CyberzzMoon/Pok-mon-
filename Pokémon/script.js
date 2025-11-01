const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ghost: "#e8e8e8",
  steel: "#f0f0f0",
  ice: "#e0f7ff",
  dark: "#d4d4d4",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  // Get abilities
  const abilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  // Get stats
  const stats = pokemon.stats;

  // Convert height and weight
  const height = `${Math.floor(pokemon.height / 10)}'${String(pokemon.height % 10).padStart(2, "0")}"`;
  const weight = (pokemon.weight / 10).toFixed(1);

  // Create types HTML
  const typesHTML = poke_types
    .map((type) => `<span class="type">${type}</span>`)
    .join("");

  // Create stats HTML
  const statsHTML = stats
    .slice(0, 3)
    .map(
      (stat) =>
        `<div class="stat">
      <span class="stat-name">${stat.stat.name}</span>
      <span class="stat-value">${stat.base_stat}</span>
    </div>`,
    )
    .join("");

  const pokemonInnerHTML = `
    <div class="img-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <div class="types">
        ${typesHTML}
      </div>
      <div class="details">
        <div class="detail-row">
          <span class="detail-label">Height:</span>
          <span class="detail-value">${height}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Weight:</span>
          <span class="detail-value">${weight} lbs</span>
        </div>
        <div class="abilities">
          <div class="detail-label">Abilities:</div>
          <div style="margin-top: 5px;">
            ${abilities
              .split(", ")
              .map((ability) => `<span class="ability">${ability}</span>`)
              .join("")}
          </div>
        </div>
        <div class="stats">
          <div class="detail-label" style="margin-bottom: 8px;">Base Stats:</div>
          ${statsHTML}
        </div>
      </div>
    </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
