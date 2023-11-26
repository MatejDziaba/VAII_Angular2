import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCheckoutComponent } from './module-checkout.component';

describe('ModuleCheckoutComponent', () => {
  let component: ModuleCheckoutComponent;
  let fixture: ComponentFixture<ModuleCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
