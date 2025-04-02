import {Directive, ElementRef, inject, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appTypeColor]',
  standalone: true,
})
export class TypeColorDirective implements OnChanges{

  @Input() appTypeColor!: string;

  private el: ElementRef = inject(ElementRef);

  private typeColors: { [key: string]: string } = {
    normal: '#A8A87B',
    fire: '#EE803B',
    water: '#6890F0',
    grass: '#5DBE62B2',
    electric: '#F7CF43',
    ice: '#9AD8D8',
    fighting: '#BE322E',
    poison: '#B563CE',
    ground: '#DFBF6E',
    flying: '#A893ED',
    psychic: '#EC5C89',
    bug: '#A8B732',
    rock: '#B89F41',
    ghost: '#705A97',
    dark: '#705849',
    dragon: '#7043F4',
    steel: '#B8B9CF',
    fairy: '#EFB7BD'
  };

  ngOnChanges() {
    const color = this.typeColors[this.appTypeColor.toLowerCase()] || '#A8A878'
    this.el.nativeElement.style.backgroundColor = color;
    const path = this.el.nativeElement.querySelector('path');
    if (path) {
      path.setAttribute('stroke', color);
    }
  }

}
