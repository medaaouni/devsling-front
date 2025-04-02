import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import {Pokemon} from '../../../../core/models/pokemon.model';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly bind the pokemon input', () => {
    const mockPokemon: Pokemon = {
      name: 'Pikachu',
      stats: [{ base_stat: 90,stat: {name:'speed',url:'url'},effort:2}]
    } as Pokemon;

    component.pokemon = mockPokemon;
    fixture.detectChanges();

    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('should correctly format stat names', () => {
    expect(component.formatStatName('hp')).toBe('HP');
    expect(component.formatStatName('attack')).toBe('ATK');
    expect(component.formatStatName('defense')).toBe('DEF');
    expect(component.formatStatName('special-attack')).toBe('SATK');
    expect(component.formatStatName('special-defense')).toBe('SDEF');
    expect(component.formatStatName('speed')).toBe('SPD');
    expect(component.formatStatName('unknown')).toBe('UNKNOWN');
  });
});
