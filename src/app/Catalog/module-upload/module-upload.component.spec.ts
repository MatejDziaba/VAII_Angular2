import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUploadComponent } from './module-upload.component';

describe('ModuleUploadComponent', () => {
  let component: ModuleUploadComponent;
  let fixture: ComponentFixture<ModuleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
