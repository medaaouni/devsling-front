export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}


export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}

export interface PokemonEvolution {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
}


export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel'
  | 'fairy';




export interface PokemonEvolutionChain {
  pokemon_v2_pokemonspecies: {
    id: number;
    name: string;
    pokemon_v2_pokemons: {
      pokemon_v2_pokemonsprites: {
        sprites: string;
      }[];
    }[];
  }[];
}
