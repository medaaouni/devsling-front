import type { Meta, StoryObj } from '@storybook/angular';
import { StatsComponent } from './stats.component';
import { Pokemon } from '../../../../core/models/pokemon.model';

const meta: Meta<StatsComponent> = {
  title: 'Pokemon/Stats',
  component: StatsComponent,
  tags: ['autodocs'],
  argTypes: {
    pokemon: {
      control: 'object',
      description: 'Pokemon data with stats array'
    }
  },
};

export default meta;
type Story = StoryObj<StatsComponent>;

const createMockPokemon = (statsValues: number[]): Pokemon => ({
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
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/'
      }
    }
  ],
  stats: [
    { base_stat: statsValues[0], effort: 0, stat: { name: 'hp', url: '' } },
    { base_stat: statsValues[1], effort: 0, stat: { name: 'attack', url: '' } },
    { base_stat: statsValues[2], effort: 0, stat: { name: 'defense', url: '' } },
    { base_stat: statsValues[3], effort: 0, stat: { name: 'special-attack', url: '' } },
    { base_stat: statsValues[4], effort: 0, stat: { name: 'special-defense', url: '' } },
    { base_stat: statsValues[5], effort: 0, stat: { name: 'speed', url: '' } }
  ]
});

export const BulbarusStats: Story = {
  args: {
    pokemon: createMockPokemon([45, 49, 49, 65, 65, 45])
  },
  name: 'Bulbasaur Stats'
};

export const PhysicalAttacker: Story = {
  args: {
    pokemon: createMockPokemon([70, 140, 65, 50, 60, 110])
  },
  name: 'Physical Attacker'
};

