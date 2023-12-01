import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogcomponentComponent } from './catalogcomponent.component';

describe('CatalogcomponentComponent', () => {
  let component: CatalogcomponentComponent;
  let fixture: ComponentFixture<CatalogcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
