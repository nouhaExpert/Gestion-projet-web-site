import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsemployeeComponent } from './detailsemployee.component';

describe('DetailsemployeeComponent', () => {
  let component: DetailsemployeeComponent;
  let fixture: ComponentFixture<DetailsemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
