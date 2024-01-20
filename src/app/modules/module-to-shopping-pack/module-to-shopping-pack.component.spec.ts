import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleToShoppingPackComponent } from './module-to-shopping-pack.component';

describe('ModuleToShoppingPackComponent', () => {
  let component: ModuleToShoppingPackComponent;
  let fixture: ComponentFixture<ModuleToShoppingPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleToShoppingPackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleToShoppingPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
