import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddBazarProductComponent } from './module-add-bazar-product.component';

describe('ModuleAddBazarProductComponent', () => {
  let component: ModuleAddBazarProductComponent;
  let fixture: ComponentFixture<ModuleAddBazarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleAddBazarProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleAddBazarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
