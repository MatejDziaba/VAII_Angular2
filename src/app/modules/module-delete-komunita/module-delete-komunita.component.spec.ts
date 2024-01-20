import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDeleteKomunitaComponent } from './module-delete-komunita.component';

describe('ModuleDeleteKomunitaComponent', () => {
  let component: ModuleDeleteKomunitaComponent;
  let fixture: ComponentFixture<ModuleDeleteKomunitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDeleteKomunitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleDeleteKomunitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
