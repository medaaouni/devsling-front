import {gql} from 'apollo-angular';


export const GET_POKEMON_EVOLUTIONS = gql`
  query GetPokemonEvolutions($pokemonId: Int!) {
    pokemon_v2_evolutionchain(where: {pokemon_v2_pokemonspecies: {id: {_eq: $pokemonId}}}) {
      pokemon_v2_pokemonspecies(order_by: {id: asc}) {
        id
        name
        pokemon_v2_pokemons(limit: 1) {
          pokemon_v2_pokemonsprites {
            sprites(path: "other.official-artwork.front_default")
          }
        }
      }
    }
  }
`;



