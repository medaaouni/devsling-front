import {Component, Input} from '@angular/core';
import {Pokemon} from '../../../../core/models/pokemon.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  @Input()
  pokemon! : Pokemon

  formatStatName(statName: string): string {
    const statNameMap: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'ATK',
      'defense': 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      'speed': 'SPD'
    };

    return statNameMap[statName] || statName.toUpperCase();
  }

}
