import type { Meta, StoryObj } from '@storybook/angular';
import {PokemonEvolutionChain} from '../../../../core/models/pokemon.model';
import {EvolutionComponent} from './evolution.component';

interface EvolutionComponentArgs {
  evolutionChain: PokemonEvolutionChain;
  primaryColor: string;
}

const meta: Meta<EvolutionComponent> = {
  title: 'Pokemon/Evolution Chain',
  component: EvolutionComponent,
  tags: ['autodocs'],
  argTypes: {
    evolutionChain: {
      control: { type: 'object' },
      description: 'Pokemon evolution chain data'
    },
    primaryColor: {
      control: 'color',
      description: 'Background color based on primary type'
    }
  }
} as Meta<EvolutionComponent>;

export default meta;
type Story = StoryObj<EvolutionComponentArgs>;

const bulbasaurEvolutionChain = {
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

export const GrassTypeEvolution: Story = {
  args: {
    evolutionChain: bulbasaurEvolutionChain,
    primaryColor: '#78C850' // Grass type green
  }
};

export const FireTypeEvolution: Story = {
  args: {
    evolutionChain: {
      pokemon_v2_pokemonspecies: [
        {
          id: 4,
          name: 'charmander',
          pokemon_v2_pokemons: [{
            pokemon_v2_pokemonsprites: [{
              sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
            }]
          }]
        },
        {
          id: 5,
          name: 'charmeleon',
          pokemon_v2_pokemons: [{
            pokemon_v2_pokemonsprites: [{
              sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png'
            }]
          }]
        }
      ]
    },
    primaryColor: '#F08030' // Fire type orange
  }
};
