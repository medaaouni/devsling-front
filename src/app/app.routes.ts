import { Routes } from '@angular/router';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {NotFoundPageComponent} from './features/not-found-page/not-found-page.component';
import {PokemonDetailComponent} from './features/pokemon-detail-page/pokemon-detail.component';

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', component: NotFoundPageComponent },
];
