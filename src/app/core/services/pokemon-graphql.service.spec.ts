import { TestBed } from '@angular/core/testing';

import { PokemonGraphqlService } from './pokemon-graphql.service';
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {GET_POKEMON_EVOLUTIONS} from '../graphql/pokemon.queries';
import {GraphQLError} from 'graphql/error';

describe('PokemonGraphqlService', () => {
  let service: PokemonGraphqlService;
  let apolloController: ApolloTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [PokemonGraphqlService]
    });

    service = TestBed.inject(PokemonGraphqlService);
    apolloController = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    apolloController.verify();
  });

  describe('getPokemonEvolutions', () => {

    it('should return evolution chain data for valid pokemonId', () => {

      const mockResponse = {
        data: {
          pokemon_v2_evolutionchain: [{
            pokemon_v2_pokemonspecies: [
              { id: 1, name: 'bulbasaur',pokemon_v2_pokemons : [ {pokemon_v2_pokemonsprites:[]}]},
              { id: 2, name: 'ivysaur',pokemon_v2_pokemons : [ {pokemon_v2_pokemonsprites:[]}] }
            ]
          }]
        }
      };

      service.getPokemonEvolutions(1).subscribe(
        response => {
          expect(response).toEqual(mockResponse.data.pokemon_v2_evolutionchain[0])
        }
      );

      const op = apolloController.expectOne(GET_POKEMON_EVOLUTIONS);

      expect(op.operation.variables["pokemonId"]).toBe(1);
      op.flush(mockResponse);

    });

    it('should handle graphql errors', () => {
      const errorMessage = 'GraphQL error occurred';
      const graphQLError = new GraphQLError(errorMessage);

      service.getPokemonEvolutions(1).subscribe(
        {
          next:()=> fail('should have failed'),
          error:(error)=>{
            expect(error).toEqual(graphQLError)
          }
        }
      );

      const op = apolloController.expectOne(GET_POKEMON_EVOLUTIONS);
      op.graphqlErrors([graphQLError])

    });


  })


});
