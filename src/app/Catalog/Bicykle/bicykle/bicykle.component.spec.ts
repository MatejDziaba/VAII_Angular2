import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicykleComponent } from './bicykle.component';

describe('BicykleComponent', () => {
  let component: BicykleComponent;
  let fixture: ComponentFixture<BicykleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicykleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BicykleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
