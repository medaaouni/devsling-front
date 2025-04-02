import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {Pokemon, PokemonDetails, PokemonSpecies} from '../models/pokemon.model';
import {environment} from '../../../environments/environment';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPokemonByIdOrName', () => {

    const mockPokemon: Pokemon = {
      id: 1,
      name: 'ivysaur',
      height: 7,
      weight: 69,
      sprites: {
        front_default: 'front_default_url',
        other: {
          'official-artwork': {
            front_default: 'official_artwork_url'
          }
        }
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'grass_type_url'
          }
        }
      ],
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: 'hp',
            url: 'hp_stat_url'
          }
        }
      ]
    };

    const mockSpecies: PokemonSpecies = {
      flavor_text_entries : [
        {
          flavor_text : "description"
        }
      ]
    };

    const expectedResponse: PokemonDetails = {
      pokemon: mockPokemon,
      pokemonSpecies: mockSpecies
    };

    it('should fetch pokemon and species successfully', () => {

      service.getPokemon(1).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });


      const pokemonReq = httpMock.expectOne(`${environment.BASE_URL}/pokemon/1`)
      expect(pokemonReq.request.method).toBe('GET');
      pokemonReq.flush(mockPokemon);

      const speciesReq = httpMock.expectOne(`${environment.BASE_URL}/pokemon-species/1`)
      expect(pokemonReq.request.method).toBe('GET');
      speciesReq.flush(mockSpecies);

    });

    it('should handle 404 error when pokemon not found', () => {
      service.getPokemon('invalid').subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne(`${environment.BASE_URL}/pokemon/invalid`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });

  })

});

