const poke_container = document.getElementById('poke_container');
const pokemons_number = 50;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const url1= `https://pokeapi.co/api/v2/ability/${id}`;
	const res = await fetch(url);
	const res1 = await fetch(url1);
	const pokemon = await res.json();
	const pokemon1 = await res1.json();
	createPokemonCard(pokemon,pokemon1);
};

async function createPokemonCard(pokemon,pokemon1) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
			<h4>Weigth: ${Math.floor(Math.random()*100)}Kg</h4>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

       pokemonEl.innerHTML = pokeInnerHTML;

        poke_container.appendChild(pokemonEl);
}

fetchPokemons();










