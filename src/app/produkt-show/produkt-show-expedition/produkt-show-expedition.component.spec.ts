import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktShowExpeditionComponent } from './produkt-show-expedition.component';

describe('ProduktShowExpeditionComponent', () => {
  let component: ProduktShowExpeditionComponent;
  let fixture: ComponentFixture<ProduktShowExpeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktShowExpeditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduktShowExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
