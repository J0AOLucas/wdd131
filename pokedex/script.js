document.addEventListener('DOMContentLoaded', () =>
{
    const cardsGroup = document.getElementById('cards');
    const modal = document.getElementById('modal');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const colors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    // Store all Pokemon data
    let allPokemonData = [];

    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(async data => {
        let results = data['results']

        for (const element of results) {
            let generalDetails = await GetGeneralDetails(element['url']);

            const id = generalDetails['id'];
            const name = generalDetails['name'];
            const types = generalDetails['types'];
            const pokemonImage = GetPhoto(id);
            const card = document.createElement('div');
            const closeButtom = document.getElementById('close');

            // Store Pokemon data for search
            allPokemonData.push({
                id: id,
                name: name,
                details: generalDetails,
                card: null
            });

            card.className = 'card';
            card.setAttribute('data-pokemon-name', name.toLowerCase());
            card.innerHTML = `
                <h2 class='pokemon-id'>ID: ${id}</h2>
                <img class='pokemonImage' src='${pokemonImage}' alt='${CapitalizeWord(name)} Pokemon' loading='lazy'>
                <p class='pokemon-name'>${CapitalizeWord(name)}</p>
                <div class='image-types'>
                    ${GetTypeImage(types)}
                </div>
            `;

            // Store card reference
            allPokemonData[allPokemonData.length - 1].card = card;

            card.addEventListener('click', async () => {
                await UpdateModal(generalDetails)
                openModal();
            });

            closeButtom.addEventListener('click', () => {
                modal.style.display = 'none';
            })

            cardsGroup.appendChild(card);
        }
    })

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    })

    // Search functionality
    function FilterPokemon(searchTerm) {
        // Remove any existing empty state message
        const existingMessage = cardsGroup.querySelector('.empty-state');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (!searchTerm || searchTerm.trim() === '') {
            // Show all cards if search is empty
            allPokemonData.forEach(pokemon => {
                if (pokemon.card) {
                    pokemon.card.style.display = 'flex';
                }
            });
            return;
        }

        const normalizedSearch = searchTerm.toLowerCase().trim();
        
        // Use filter to find matching Pokemon
        const matchingPokemon = allPokemonData.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(normalizedSearch);
        });

        // Hide all cards first
        allPokemonData.forEach(pokemon => {
            if (pokemon.card) {
                pokemon.card.style.display = 'none';
            }
        });

        // Show only matching cards using forEach
        matchingPokemon.forEach(pokemon => {
            if (pokemon.card) {
                pokemon.card.style.display = 'flex';
            }
        });

        // Show message if no results
        if (matchingPokemon.length === 0) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'empty-state';
            messageDiv.innerHTML = `<p>No Pokemon found for "${searchTerm}"</p>`;
            messageDiv.style.textAlign = 'center';
            messageDiv.style.padding = '50px';
            messageDiv.style.fontSize = '24px';
            messageDiv.style.color = '#595757';
            cardsGroup.appendChild(messageDiv);
        }
    }

    // Event listeners for search
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (searchInput) {
                FilterPokemon(searchInput.value);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                FilterPokemon(searchInput.value);
            }
        });

        // Real-time search with debounce
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                FilterPokemon(searchInput.value);
            }, 300);
        });
    }

    function openModal() {
        modal.style.display = 'flex';
    }

    async function UpdateModal(generalDetails) {
        let id = generalDetails['id']
        let hp = generalDetails['base_experience']
        let height = generalDetails['height']
        let weight = generalDetails['weight']
        let habilities = GetHabilities(generalDetails['abilities']);
        let photo = GetPhoto(id);
        let modalPhoto = document.getElementById('pokemon-modal-photo');
        let pokemonName = document.getElementById('modal-pokemon-name');
        let name = generalDetails['name'];
        let typeColor = generalDetails['types'][0]['type']['name']
        let color = colors[typeColor]
        let modalContent = document.getElementById('modal-content');
        let hpElement = document.getElementById('hp');
        let heightElement = document.getElementById('height');
        let weightElement = document.getElementById('weight');
        let habilitiesElement = document.getElementById('habilities');

        modalContent.style.backgroundColor = color;
        modalPhoto.src = photo;
        modalPhoto.style.width = '400px';
        pokemonName.textContent = CapitalizeWord(name);
        hpElement.textContent = hp;
        heightElement.textContent = height;
        weightElement.textContent = weight;
        habilitiesElement.textContent = habilities;
    }

    // async function GetColor(id) {
    //     let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    //     let data = await response.json();
    //     return data['color']['name']
    // }

    function GetTypeImage(types)
    {
        return types.map(element => 
            `<img class='type-image' src='./src/images/types/${element['type']['name']}.png' alt='${CapitalizeWord(element['type']['name'])} type' loading='lazy'>`
        ).join('');
    }

    function CapitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    function GetPhoto(id)
    {
        let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return image;
    }

    function GetHabilities(habilities) {
        return habilities.map(a => 
            CapitalizeWord(a['ability']['name'])
        ).join(', ');
    }

    async function GetGeneralDetails(link)
    {
        const response = await fetch(link);
        const data = await response.json();
        return data;
    }
})