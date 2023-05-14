import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDialogComponent } from './activite-dialog.component';

describe('ActiviteDialogComponent', () => {
  let component: ActiviteDialogComponent;
  let fixture: ComponentFixture<ActiviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
