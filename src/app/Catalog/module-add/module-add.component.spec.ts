import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddComponent } from './module-add.component';

describe('ModuleAddComponent', () => {
  let component: ModuleAddComponent;
  let fixture: ComponentFixture<ModuleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
