import { TestBed } from '@angular/core/testing';

import { PlanSettingsService } from './plan-settings.service';

describe('PlanSettingsService', () => {
  let service: PlanSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
