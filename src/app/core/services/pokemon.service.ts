import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/pokemon.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http: HttpClient = inject(HttpClient)

  getPokemon(idOrName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.BASE_URL}/pokemon/${idOrName}`);
  }
}
