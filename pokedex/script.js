document.addEventListener('DOMContentLoaded', () =>
{
    const cardsGroup = document.getElementById('cards');
    const modal = document.getElementById('modal');
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

            card.className = 'card';
            card.innerHTML = `
                <h1 class='pokemon-id'>ID: ${id}</h1>
                <img class='pokemonImage' src='${pokemonImage}' alt='Pokemon Image'>
                <p class='pokemon-name'>${CapitalizeWord(name)}</p>
                <div class='image-types'>
                    ${GetTypeImage(types)}
                </div>
            `;

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
            `<img class='type-image' src='./src/images/types/${element['type']['name']}.png' alt='power type'>`
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