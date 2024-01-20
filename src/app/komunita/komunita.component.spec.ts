import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomunitaComponent } from './komunita.component';

describe('KomunitaComponent', () => {
  let component: KomunitaComponent;
  let fixture: ComponentFixture<KomunitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KomunitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KomunitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
