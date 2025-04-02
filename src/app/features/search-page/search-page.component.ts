import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  searchControl: FormControl = new FormControl();

  private router: Router = inject(Router);

  searchByQuery() {
    const query: string | number = this.searchControl.value;
    this.search(query)
  }

  randomSearch() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    this.search(randomId)
  }

  search(query: string | number) {
    if (query) {
      this.router.navigate(['pokemon', query]);
    }
  }

}
