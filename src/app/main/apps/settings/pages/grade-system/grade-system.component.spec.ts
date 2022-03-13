import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSystemComponent } from './grade-system.component';

describe('GradeSystemComponent', () => {
  let component: GradeSystemComponent;
  let fixture: ComponentFixture<GradeSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
