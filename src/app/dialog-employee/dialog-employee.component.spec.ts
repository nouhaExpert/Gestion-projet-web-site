import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmployeeComponent } from './dialog-employee.component';

describe('DialogEmployeeComponent', () => {
  let component: DialogEmployeeComponent;
  let fixture: ComponentFixture<DialogEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
