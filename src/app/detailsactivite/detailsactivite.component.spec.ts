import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsactiviteComponent } from './detailsactivite.component';

describe('DetailsactiviteComponent', () => {
  let component: DetailsactiviteComponent;
  let fixture: ComponentFixture<DetailsactiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsactiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsactiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
