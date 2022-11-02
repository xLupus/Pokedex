let lista      = document.getElementById('pokemons');
let info       = document.getElementById('pokemon_details');

let card_color = {
    'Bug'     : '#cad479', 'Dark'   : '#a99a91', 'Dragon'  : '#a987fa',
    'Electric': '#fae282', 'Fairy'  : '#f4c1cd', 'Fighting': '#d9827e',
    'Fire'    : '#f6b282', 'Flying' : '#cabcf6', 'Ghost'   : '#a99ac1',
    'Grass'   : '#aede96', 'Ground' : '#ecd9a4', 'Ice'     : '#c1e7e7',
    'Normal'  : '#cacaae', 'Poison' : '#c68cc6', 'Psychic' : '#fa9ab7',
    'Rock'    : '#d4c687', 'Steel'  : '#d4d4e2', 'Water'   : '#a4bcf6',
    'Legend'  : '#a4c6bc'
};

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then( response => response.json())
    .then( (json) => {
        let pokemons = json.results;

        for (let i = 0; i < pokemons.length; i++) {
            let pokemon            = document.createElement('li');
            let pokemon_id         = document.createElement('span');
            let pokemon_nome       = document.createElement('span');

            pokemon.className      = 'pokemon';
            pokemon_id.className   = 'pokemon_id';
            pokemon_nome.className = 'pokemon_name';

            pokemon_nome.innerText = pokemons[i].name.charAt(0).toUpperCase() + pokemons[i].name.slice(1) ;
            pokemon_id.innerText   = (i < 9) ? '#0' + (i + 1) : '#' + (i + 1);

            pokemon.setAttribute('onclick', `getPokemonStats(${i + 1})`);

            pokemon.appendChild(pokemon_id);
            pokemon.appendChild(pokemon_nome);
            lista.appendChild(pokemon);
        }
    })
    .catch( (error) => {
        console.log(error);
    })

function getPokemonStats(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then( response => response.json())
        .then( (json) => {
            let pokemon_list    = document.getElementById('pokemon_info')
            let pokemon_img     = document.getElementById('pokemon_img');
            let pokemon_id      = document.getElementById('pokemon_info_id_value');
            let pokemon_nome    = document.getElementById('pokemon_info_nome_value');
            let pokemon_type    = document.getElementById('pokemon_info_type_value');
            let pokemon_weight  = document.getElementById('pokemon_info_weight_value');
            let pokemon_height  = document.getElementById('pokemon_info_height_value');
            let base_experience = document.getElementById('pokemon_info_base-experience_value');
            let pokemon_status  = document.getElementsByClassName('status');
            let status_value    = document.getElementsByClassName('status_value');
            let type            = [];

            for(let i = 0; i < json.types.length; i++)
                type[i] = json.types[i].type.name.charAt(0).toUpperCase() +  json.types[i].type.name.slice(1);

            info.style.backgroundColor = card_color[type[0]];

            type = type.join(" / ");

            for(let i = 0; i < json.stats.length; i++){
                status_value[i].innerText = json.stats[i].base_stat;
                pokemon_status[i].appendChild(status_value[i]);
            }

            pokemon_id.innerText      = (json.id < 10) ? pokemon_id.innerText = '0' + json.id : pokemon_id.innerText = json.id;
            pokemon_img.src           = json.sprites.front_default;
            pokemon_nome.innerText    = json.name.charAt(0).toUpperCase() + json.name.slice(1);
            pokemon_type.innerText    = type;
            pokemon_weight.innerText  = json.weight + 'kg';
            pokemon_height.innerText  = json.height + '0cm';
            base_experience.innerText = json.base_experience;

        })
        .catch( (error) => {
            console.log(error);
        })
}
