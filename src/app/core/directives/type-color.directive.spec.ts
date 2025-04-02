import {TypeColorDirective} from './type-color.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: `
    <div [appTypeColor]="'fire'"></div>
    <svg [appTypeColor]="'fire'" class="test-svg">
      <path d="M10 10"></path>
    </svg>`,
  imports: [
    TypeColorDirective
  ]
})
class TestComponent {
}

describe('TypeColorDirective', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({})

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  })


  it('should set the correct background color for fire type', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.style.backgroundColor).toEqual('rgb(238, 128, 59)');
  });
});
