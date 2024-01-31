import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUploadKomunitaComponent } from './module-upload-komunita.component';

describe('ModuleUploadKomunitaComponent', () => {
  let component: ModuleUploadKomunitaComponent;
  let fixture: ComponentFixture<ModuleUploadKomunitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUploadKomunitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleUploadKomunitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
