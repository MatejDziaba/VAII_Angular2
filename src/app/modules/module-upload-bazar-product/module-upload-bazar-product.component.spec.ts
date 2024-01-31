import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUploadBazarProductComponent } from './module-upload-bazar-product.component';

describe('ModuleUploadBazarProductComponent', () => {
  let component: ModuleUploadBazarProductComponent;
  let fixture: ComponentFixture<ModuleUploadBazarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUploadBazarProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleUploadBazarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
