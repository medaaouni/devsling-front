import { TestBed } from '@angular/core/testing';

import { PokemonGraphqlService } from './pokemon-graphql.service';

describe('PokemonGraphqlService', () => {
  let service: PokemonGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
