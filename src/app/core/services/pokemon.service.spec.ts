import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {Pokemon} from '../models/pokemon.model';
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

    it('should fetch pokemon by name', () => {
      const testName = "ivysaur"
      service.getPokemon(testName).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        expect(pokemon.name).toBe(testName);
      });
      const req = httpMock.expectOne(`${environment.BASE_URL}/pokemon/${testName}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);

    });
  })
});

