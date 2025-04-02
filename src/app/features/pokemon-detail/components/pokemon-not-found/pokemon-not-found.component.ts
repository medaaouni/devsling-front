import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pokemon-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pokemon-not-found.component.html',
  styleUrl: './pokemon-not-found.component.css'
})
export class PokemonNotFoundComponent {

}
