import { TestBed } from '@angular/core/testing';

import { GuardNonadminGuard } from './guard-nonadmin.guard';

describe('GuardNonadminGuard', () => {
  let guard: GuardNonadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardNonadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
