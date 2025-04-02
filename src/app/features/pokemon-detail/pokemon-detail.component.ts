import {Component, inject, Input} from '@angular/core';
import {
    AsyncPipe,
    NgIf,
    NgOptimizedImage,
    NgTemplateOutlet,
    TitleCasePipe,
    UpperCasePipe
} from '@angular/common';
import {StatsComponent} from './components/stats/stats.component';
import {PokemonService} from '../../core/services/pokemon.service';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {Pokemon, PokemonEvolutionChain} from '../../core/models/pokemon.model';
import {PokemonGraphqlService} from '../../core/services/pokemon-graphql.service';
import {EvolutionComponent} from './components/evolution/evolution.component';
import {TypeColorDirective} from '../../core/directives/type-color.directive';
import {RouterLink} from '@angular/router';
import {PokemonNotFoundComponent} from "./components/pokemon-not-found/pokemon-not-found.component";

@Component({
    selector: 'app-pokemon-detail',
    imports: [
        TitleCasePipe,
        UpperCasePipe,
        NgIf,
        StatsComponent,
        AsyncPipe,
        EvolutionComponent,
        TypeColorDirective,
        NgTemplateOutlet,
        NgOptimizedImage,
        RouterLink,
        PokemonNotFoundComponent,
    ],
    templateUrl: './pokemon-detail.component.html',
    styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {

    @Input()
    set id(id: number) {
        if (id) {
            this._id = id
            this.fetchPokemonData();
        }

    }

    private _id!: number | string

    private pokemonService: PokemonService = inject(PokemonService);

    private pokemonGraphqlService: PokemonGraphqlService = inject(PokemonGraphqlService);

    activeTab: 'stats' | 'evolutions' | 'moves' = 'stats';
    loading = false;
    errorMessage = '';


    pokemon$!: Observable<Pokemon>;
    pokemonEvolutionChain$!: Observable<PokemonEvolutionChain>;

    setActiveTab(tab: 'stats' | 'evolutions' | 'moves'): void {
        this.activeTab = tab;
    }

    private fetchPokemonData(): void {
        this.pokemon$ = this.pokemonService.getPokemon(this._id!).pipe(
            tap(pokemon => {
                this.pokemonEvolutionChain$ = this.pokemonGraphqlService.getPokemonEvolutions(pokemon.id).pipe(
                    catchError(err => {
                        this.errorMessage = err.message
                        return EMPTY
                    }),
                );
            }),
            catchError(err => {
                this.errorMessage = err.message
                return EMPTY
            }),
        );
    }

}
