const pokemonList = document.querySelector('.pokemon-list');
const collectionList = document.querySelector('.collection-list');
const pokemonDetails = document.querySelector('.pokemon-details');

const userCollection = new Set();

const numberOfPokemons = 8;
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results;
        
        pokemons.forEach(pokemon => {
            const pokemonItem = document.createElement('div');
            pokemonItem.className = 'pokemon-item';
            let pokemonName =  pokemon.name;
            pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            console.log(pokemonName)
            pokemonItem.textContent = pokemonName;
            pokemonItem.addEventListener('click', () => fetchPokemonDetails(pokemon.name));
            pokemonList.appendChild(pokemonItem);
        });
    });
    

function fetchPokemonDetails(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            const { name, height, weight, types } = data;
            const typeNames = types.map(type => type.type.name).join(', ');

            pokemonDetails.innerHTML = `
                <h2>${capitalizeFirstLetter(name)}</h2>
                <p><strong>Height:</strong> ${height}</p>
                <p><strong>Weight:</strong> ${weight}</p>
                <p><strong>Types:</strong> ${capitalizeFirstLetter(typeNames)}</p>
                <button class="add-to-collection">Add to Collection</button>
                <button class="remove-from-collection">Remove from Collection</button>
            `;

            const addToCollectionButton = pokemonDetails.querySelector('.add-to-collection');
            const removeFromCollectionButton = pokemonDetails.querySelector('.remove-from-collection');

            if (userCollection.has(pokemonName)) {
                addToCollectionButton.style.display = 'none';
                removeFromCollectionButton.style.display = 'block';
            } else {
                addToCollectionButton.style.display = 'block';
                removeFromCollectionButton.style.display = 'none';
            }

            addToCollectionButton.addEventListener('click', () => addToCollection(pokemonName));
            removeFromCollectionButton.addEventListener('click', () => removeFromCollection(pokemonName));

            pokemonDetails.style.display = 'block';
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addToCollection(pokemonName) {
    userCollection.add(pokemonName);
    updateCollectionDisplay();
}

function removeFromCollection(pokemonName) {
    userCollection.delete(pokemonName);
    updateCollectionDisplay();
}

function updateCollectionDisplay() {
    collectionList.innerHTML = '';

    userCollection.forEach(pokemonName => {
        const collectionItem = document.createElement('div');
        collectionItem.className = 'collection-item';
        collectionItem.textContent = pokemonName;
        collectionList.appendChild(collectionItem);
    });
}
