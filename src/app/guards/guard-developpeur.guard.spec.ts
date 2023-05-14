import { TestBed } from '@angular/core/testing';

import { GuardDeveloppeurGuard } from './guard-developpeur.guard';

describe('GuardDeveloppeurGuard', () => {
  let guard: GuardDeveloppeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardDeveloppeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
