import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import {Router} from '@angular/router';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;



  beforeEach(async () => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);


    await TestBed.configureTestingModule({
      imports: [SearchPageComponent],
      providers : [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when searching by query', () => {
    component.searchControl.setValue('pikachu');
    component.searchByQuery();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['pokemon', 'pikachu']);
  });

  it('should navigate when performing a random search', () => {
    spyOn(Math, 'random').and.returnValue(0.5);
    component.randomSearch();

    const expectedId = Math.floor(0.5 * 898) + 1;
    expect(mockRouter.navigate).toHaveBeenCalledWith(['pokemon', expectedId]);
  });

  it('should not navigate if search query is empty', () => {
    component.searchControl.setValue('');
    component.searchByQuery();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});
