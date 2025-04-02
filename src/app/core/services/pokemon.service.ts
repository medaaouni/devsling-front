import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Pokemon} from '../models/pokemon.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http: HttpClient = inject(HttpClient)

  getPokemon(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.BASE_URL}/pokemon/${idOrName}`).pipe(
      catchError(this.handleError)
    );
  }

  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return this.getPokemon(randomId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse):Observable<never> {
    return throwError(() => err);
  }
}
