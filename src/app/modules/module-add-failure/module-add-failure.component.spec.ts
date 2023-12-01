import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddFailureComponent } from './module-add-failure.component';

describe('ModuleAddFailureComponent', () => {
  let component: ModuleAddFailureComponent;
  let fixture: ComponentFixture<ModuleAddFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleAddFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleAddFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
