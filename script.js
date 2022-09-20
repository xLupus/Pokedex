let getPokemon = new XMLHttpRequest();
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

getPokemon.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151', true);
getPokemon.send();
getPokemon.onreadystatechange = function(){
    if(getPokemon.readyState == 4 && getPokemon.status == 200) {
        let response = JSON.parse(getPokemon.responseText);
        response     = response.results

        for (let i = 0; i < response.length; i++) {
            let pokemon            = document.createElement('li');
            let pokemon_id         = document.createElement('span');
            let pokemon_nome       = document.createElement('span');

            pokemon.className      = 'pokemon';
            pokemon_id.className   = 'pokemon_id';
            pokemon_nome.className = 'pokemon_name';

            pokemon_nome.innerText = response[i].name.charAt(0).toUpperCase() + response[i].name.slice(1) ;
            pokemon_id.innerText   = (i < 9) ? '#0' + (i + 1) : '#' + (i + 1);

            pokemon.setAttribute('onclick', `getPokemonStats(${i + 1})`);

            pokemon.appendChild(pokemon_id);
            pokemon.appendChild(pokemon_nome);
            lista.appendChild(pokemon);
        }
    }
}

function getPokemonStats(id){
    getPokemon.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`, false);
    getPokemon.send();
    if( getPokemon.readyState == 4 && getPokemon.status == 200 ){
        let response = JSON.parse(getPokemon.responseText);
        console.log(response);
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

        for(let i = 0; i < response.types.length; i++)
            type[i] = response.types[i].type.name.charAt(0).toUpperCase() +  response.types[i].type.name.slice(1);

        info.style.backgroundColor = card_color[type[0]];
        
        type = type.join(" / ");

        for(let i = 0; i < response.stats.length; i++){
            status_value[i].innerText = response.stats[i].base_stat;
            pokemon_status[i].appendChild(status_value[i]);
        }

        pokemon_id.innerText      = (response.id < 10) ? pokemon_id.innerText = '0' + response.id : pokemon_id.innerText = response.id;
        pokemon_img.src           = response.sprites.front_default;
        pokemon_nome.innerText    = response.name.charAt(0).toUpperCase() + response.name.slice(1);
        pokemon_type.innerText    = type;
        pokemon_weight.innerText  = response.weight + 'kg';
        pokemon_height.innerText  = response.height + '0cm';
        base_experience.innerText = response.base_experience;
    }
}
