import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktShowDescriptionComponent } from './produkt-show-description.component';

describe('ProduktShowDescriptionComponent', () => {
  let component: ProduktShowDescriptionComponent;
  let fixture: ComponentFixture<ProduktShowDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktShowDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduktShowDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
