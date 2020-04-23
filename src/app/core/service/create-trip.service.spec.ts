import { TestBed } from '@angular/core/testing';

import { CreateTripService } from './create-trip.service';

describe('CreateTripService', () => {
  let service: CreateTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
