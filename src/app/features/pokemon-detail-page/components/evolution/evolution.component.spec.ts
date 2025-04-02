import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvolutionComponent} from './evolution.component';
import {PokemonEvolutionChain} from '../../../../core/models/pokemon.model';

describe('EvolutionComponent', () => {
  let component: EvolutionComponent;
  let fixture: ComponentFixture<EvolutionComponent>;


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
      }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform evolution chains correctly', () => {

    component.evolutionChain = mockEvolutionChain;
    const expectedResult = [
      {id: 1, name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'},
    ];
    expect(component.getEvolutions()).toEqual(expectedResult);

  })

  it('should handle empty evolutionChain ', () => {
    component.evolutionChain = null;
    expect(component.getEvolutions()).toBeNull();
  })
});
