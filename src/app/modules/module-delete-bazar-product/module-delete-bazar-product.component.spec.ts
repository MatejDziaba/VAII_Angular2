import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDeleteBazarProductComponent } from './module-delete-bazar-product.component';

describe('ModuleDeleteBazarProductComponent', () => {
  let component: ModuleDeleteBazarProductComponent;
  let fixture: ComponentFixture<ModuleDeleteBazarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDeleteBazarProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleDeleteBazarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
