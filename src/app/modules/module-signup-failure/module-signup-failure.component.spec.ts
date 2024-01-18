import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSignupFailureComponent } from './module-signup-failure.component';

describe('ModuleSignupFailureComponent', () => {
  let component: ModuleSignupFailureComponent;
  let fixture: ComponentFixture<ModuleSignupFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleSignupFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleSignupFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
