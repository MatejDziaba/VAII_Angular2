import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarcomponentComponent } from './side-barcomponent.component';

describe('SideBarcomponentComponent', () => {
  let component: SideBarcomponentComponent;
  let fixture: ComponentFixture<SideBarcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
