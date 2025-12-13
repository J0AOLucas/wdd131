document.addEventListener('DOMContentLoaded', () =>
{
    const cardsGroup = document.getElementById('cards');
    const modal = document.getElementById('modal');


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

            card.addEventListener('click', () => {
                modal.style.display = 'flex';
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

    function ShowModal(pokemonData) {
        
    }

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

    async function GetGeneralDetails(link)
    {
        const response = await fetch(link);
        const data = await response.json();
        return data;
    }
})