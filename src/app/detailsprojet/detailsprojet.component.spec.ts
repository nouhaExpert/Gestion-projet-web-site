import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsprojetComponent } from './detailsprojet.component';

describe('DetailsprojetComponent', () => {
  let component: DetailsprojetComponent;
  let fixture: ComponentFixture<DetailsprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsprojetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
