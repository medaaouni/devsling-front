import {Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PokemonService} from '../../core/services/pokemon.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  searchControl: FormControl = new FormControl();

  pokemonService: PokemonService = inject(PokemonService);

  private router : Router = inject(Router);

  search(){
    const query: string = this.searchControl.value;
    if (query.length > 0){
      // TODO implement the pokemon page
      this.router.navigate(['pokemon', query]);
    }
  }

}
