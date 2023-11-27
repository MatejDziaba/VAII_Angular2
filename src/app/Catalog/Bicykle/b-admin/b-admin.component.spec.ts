import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BAdminComponent } from './b-admin.component';

describe('BAdminComponent', () => {
  let component: BAdminComponent;
  let fixture: ComponentFixture<BAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
