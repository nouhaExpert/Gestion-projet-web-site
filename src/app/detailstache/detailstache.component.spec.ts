import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstacheComponent } from './detailstache.component';

describe('DetailstacheComponent', () => {
  let component: DetailstacheComponent;
  let fixture: ComponentFixture<DetailstacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailstacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
