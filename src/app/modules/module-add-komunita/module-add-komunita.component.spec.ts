import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddKomunitaComponent } from './module-add-komunita.component';

describe('ModuleAddKomunitaComponent', () => {
  let component: ModuleAddKomunitaComponent;
  let fixture: ComponentFixture<ModuleAddKomunitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleAddKomunitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleAddKomunitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
