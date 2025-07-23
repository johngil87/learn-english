import { TestBed } from '@angular/core/testing';

import { VerbDataService } from './verb-data.service';

describe('VerbDataService', () => {
  let service: VerbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
