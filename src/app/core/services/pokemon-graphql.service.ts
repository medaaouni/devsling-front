import {inject, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {catchError, map, Observable, throwError} from 'rxjs';
import {PokemonEvolutionChain} from '../models/pokemon.model';
import {HttpErrorResponse} from '@angular/common/http';
import {GET_POKEMON_EVOLUTIONS} from '../graphql/pokemon.queries';

@Injectable({
  providedIn: 'root'
})
export class PokemonGraphqlService {

  private apollo = inject(Apollo);


  getPokemonEvolutions(pokemonId: number): Observable<PokemonEvolutionChain |null> {
    return this.apollo.watchQuery<{ pokemon_v2_evolutionchain: PokemonEvolutionChain[] }>({
      query: GET_POKEMON_EVOLUTIONS,
      variables: {pokemonId}
    }).valueChanges.pipe(
      map(
        (result) =>
          result.data?.pokemon_v2_evolutionchain?.length ? result.data.pokemon_v2_evolutionchain[0] : null),
      catchError(this.handleError)
    );

  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }


}
