import type { Meta, StoryObj } from '@storybook/angular';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonGraphqlService } from '../../core/services/pokemon-graphql.service';
import { of, throwError } from 'rxjs';
import { Pokemon, PokemonEvolutionChain } from '../../core/models/pokemon.model';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

class MockPokemonService {
  getPokemon(id: number) {
    return of({
      pokemon: mockPokemon,
      species: mockSpecies
    });
  }
}

class MockGraphQLService {
  getPokemonEvolutions(id: number) {
    return of(mockEvolutionChain);
  }
}

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      }
    }
  },
  types: [
    { slot: 1, type: { name: 'grass', url: '' } }
  ],
  stats: [
    { base_stat: 45, stat: { name: 'hp', url: '' },effort:1 },
    { base_stat: 49, stat: { name: 'attack', url: '' },effort:1 },
    { base_stat: 49, stat: { name: 'defense', url: '' },effort:1 },
    { base_stat: 65, stat: { name: 'special-attack', url: '' } ,effort:1},
    { base_stat: 65, stat: { name: 'special-defense', url: '' } ,effort:1},
    { base_stat: 45, stat: { name: 'speed', url: '' } ,effort:1}
  ]
};

const mockSpecies = {
  flavor_text_entries: [{
    flavor_text: 'A strange seed was planted on its back at birth.',
    language: { name: 'en' }
  }]
};

const mockEvolutionChain: PokemonEvolutionChain = {
  pokemon_v2_pokemonspecies: [
    {
      id: 1,
      name: 'bulbasaur',
      pokemon_v2_pokemons: [{
        pokemon_v2_pokemonsprites: [{
          sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }]
      }]
    },
    {
      id: 2,
      name: 'ivysaur',
      pokemon_v2_pokemons: [{
        pokemon_v2_pokemonsprites: [{
          sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
        }]
      }]
    }
  ]
};

const meta: Meta<PokemonDetailComponent> = {
  title: 'Pokemon/Detail Page',
  component: PokemonDetailComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        { provide: PokemonService, useClass: MockPokemonService },
        { provide: PokemonGraphqlService, useClass: MockGraphQLService }
      ],
    }),
    moduleMetadata({
      imports: [HttpClientModule, RouterTestingModule]
    })
  ]
};

export default meta;
type Story = StoryObj<PokemonDetailComponent>;


export const DefaultView: Story = {
  args: {
    id: 1
  },
  name: 'Default (Bulbasaur)'
};

export const NotFoundState: Story = {
  args: {
    id: 99999
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemon: () => throwError(() => new Error('Pokemon not found'))
          }
        }
      ]
    })
  ],
  name: 'Pokemon Not Found State'
};
