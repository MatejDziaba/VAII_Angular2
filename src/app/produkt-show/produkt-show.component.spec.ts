import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktShowComponent } from './produkt-show.component';

describe('ProduktShowComponent', () => {
  let component: ProduktShowComponent;
  let fixture: ComponentFixture<ProduktShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduktShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
