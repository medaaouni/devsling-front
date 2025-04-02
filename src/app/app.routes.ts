import { Routes } from '@angular/router';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {PokemonDetailComponent} from './features/pokemon-detail/pokemon-detail.component';
import {NotFoundPageComponent} from './features/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', component: NotFoundPageComponent },
];
