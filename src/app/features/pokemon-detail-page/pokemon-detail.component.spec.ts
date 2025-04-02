import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonDetailComponent} from './pokemon-detail.component';
import {PokemonService} from '../../core/services/pokemon.service';
import {PokemonGraphqlService} from '../../core/services/pokemon-graphql.service';
import {of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PokemonDetails, PokemonEvolutionChain} from '../../core/models/pokemon.model';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let mockPokemonGraphqlService: jasmine.SpyObj<PokemonGraphqlService>;
  const mockActivatedRoute = {
    paramMap: of({get: () => 1})
  };

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    mockPokemonGraphqlService = jasmine.createSpyObj('PokemonGraphqlService', ['getPokemonEvolutions']);

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        {provide: PokemonService, useValue: mockPokemonService},
        {provide: PokemonGraphqlService, useValue: mockPokemonGraphqlService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchPokemonData() when id is set', () => {
    spyOn(component as any, 'fetchPokemonData');
    component.id = 1;
    expect((component as any).fetchPokemonData).toHaveBeenCalled();
  });

  it('should set activeTab correctly', () => {
    component.setActiveTab('evolutions');
    expect(component.activeTab).toBe('evolutions');

    component.setActiveTab('moves');
    expect(component.activeTab).toBe('moves');
  });

  it('should fetch pokemon details and evolution chain on valid id', () => {
    const mockPokemonDetails: PokemonDetails = {
      pokemon: {
        id: 1,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          other: {
            'official-artwork': {
              front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
            }
          }
        },
        types: [
          {
            slot: 1,
            type: {
              name: 'electric',
              url: 'https://pokeapi.co/api/v2/type/13/'
            }
          }
        ],
        stats: [
          {
            base_stat: 55,
            effort: 0,
            stat: {
              name: 'hp',
              url: 'https://pokeapi.co/api/v2/stat/1/'
            }
          },
          {
            base_stat: 90,
            effort: 2,
            stat: {
              name: 'speed',
              url: 'https://pokeapi.co/api/v2/stat/6/'
            }
          }
        ]
      },
      pokemonSpecies: {
        flavor_text_entries: [
          {
            flavor_text: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.'
          }
        ]
      }
    };

    const mockEvolutionData: PokemonEvolutionChain = {
      pokemon_v2_pokemonspecies: [
        {
          id:1,
          name: 'Evolution 1',
          pokemon_v2_pokemons: [{
            pokemon_v2_pokemonsprites: [{sprites:""}]
          }]
        }]
    };

    mockPokemonService.getPokemon.and.returnValue(of(mockPokemonDetails));
    mockPokemonGraphqlService.getPokemonEvolutions.and.returnValue(of(mockEvolutionData));

    component.id = 1;
    fixture.detectChanges();

    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith(1);
    expect(mockPokemonGraphqlService.getPokemonEvolutions).toHaveBeenCalledWith(1);
  });


});
