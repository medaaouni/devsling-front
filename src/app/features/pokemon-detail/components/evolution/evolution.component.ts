import {Component, Input} from '@angular/core';
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {PokemonEvolutionChain} from '../../../../core/models/pokemon.model';
import {TypeColorDirective} from "../../../../core/directives/type-color.directive";

@Component({
  selector: 'app-evolution',
  standalone: true,
    imports: [
        TitleCasePipe,
        NgOptimizedImage,
        TypeColorDirective,
    ],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.css'
})
export class EvolutionComponent {
  @Input()
  evolutionChain: PokemonEvolutionChain |null = null;

  @Input() type!: string;

  getEvolutions() {
    return this.evolutionChain && this.evolutionChain.pokemon_v2_pokemonspecies.map((species: { id: any; name: any; pokemon_v2_pokemons: { pokemon_v2_pokemonsprites: { sprites: any; }[]; }[]; }) => ({
      id: species.id,
      name: species.name,
      image: species.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites || ''
    }));
  }

}
