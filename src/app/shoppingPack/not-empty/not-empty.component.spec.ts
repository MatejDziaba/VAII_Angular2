import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEmptyComponent } from './not-empty.component';

describe('NotEmptyComponent', () => {
  let component: NotEmptyComponent;
  let fixture: ComponentFixture<NotEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
