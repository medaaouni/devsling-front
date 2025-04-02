import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, switchMap, throwError} from 'rxjs';
import {Pokemon, PokemonDetails, PokemonSpecies} from '../models/pokemon.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http: HttpClient = inject(HttpClient)

  getPokemon(idOrName: string | number): Observable<PokemonDetails> {
    return this.http.get<Pokemon>(`${environment.BASE_URL}/pokemon/${idOrName}`).pipe(
      switchMap(
        pokemon => this.http.get<PokemonSpecies>(`${environment.BASE_URL}/pokemon-species/${pokemon.id}`).pipe(
          map((pokemonSpecies)=>({
            pokemon,
            pokemonSpecies
          }))
        )
      ),
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
