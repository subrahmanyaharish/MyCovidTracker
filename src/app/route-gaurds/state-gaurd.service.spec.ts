import { TestBed } from '@angular/core/testing';

import { StateGaurdService } from './state-gaurd.service';

describe('StateGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateGaurdService = TestBed.get(StateGaurdService);
    expect(service).toBeTruthy();
  });
});
