import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistFormComponent } from './checklist-form.component';

describe('ChecklistFormComponent', () => {
  let component: ChecklistFormComponent;
  let fixture: ComponentFixture<ChecklistFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistFormComponent]
    });
    fixture = TestBed.createComponent(ChecklistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
