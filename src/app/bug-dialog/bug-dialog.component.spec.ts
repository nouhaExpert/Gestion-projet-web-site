import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDialogComponent } from './bug-dialog.component';

describe('BugDialogComponent', () => {
  let component: BugDialogComponent;
  let fixture: ComponentFixture<BugDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
