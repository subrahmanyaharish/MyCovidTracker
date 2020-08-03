import { TestBed } from '@angular/core/testing';

import { CovidGuardService } from './covid-guard.service';

describe('CovidGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidGuardService = TestBed.get(CovidGuardService);
    expect(service).toBeTruthy();
  });
});
