import { TestBed } from '@angular/core/testing';

import { DayGuard } from './day.guard';

describe('DayGuard', () => {
  let guard: DayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
