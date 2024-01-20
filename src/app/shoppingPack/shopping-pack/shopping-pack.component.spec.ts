import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingPackComponent } from './shopping-pack.component';

describe('ShoppingPackComponent', () => {
  let component: ShoppingPackComponent;
  let fixture: ComponentFixture<ShoppingPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingPackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
