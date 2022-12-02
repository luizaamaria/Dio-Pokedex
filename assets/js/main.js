
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton =  document.getElementById('loadMoreButton')

const maxRecords = 151
const  limit = 10
let offset = 0;




function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //para cada elemento, vai chamar essa função convertPokemonToLi que irá devolver uma string que vai compor uma lista nova
        //e essa lista nova, concatenando os elementos para virar um html novo e colocando dentro do HTML que está sendo manipulado
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        
                <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol> 
            
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>         
             </li>
         `).join('')
        pokemonList.innerHTML += newHtml 
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordWithNexPage = offset + limit 

    if (qtdRecordWithNexPage >= maxRecords){
        const NewLimit = maxRecords - offset
        loadPokemonItens(offset, NewLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
//fetch é assincrono e retorna uma promisse = conforme for executado a busca, será retornado uma promessão de resposta
//atraves do metodo then > quando isto der certo, chame a função para interpretar a resposta








