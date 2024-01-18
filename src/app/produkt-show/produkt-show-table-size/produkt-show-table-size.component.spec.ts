import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktShowTableSizeComponent } from './produkt-show-table-size.component';

describe('ProduktShowTableSizeComponent', () => {
  let component: ProduktShowTableSizeComponent;
  let fixture: ComponentFixture<ProduktShowTableSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktShowTableSizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduktShowTableSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
