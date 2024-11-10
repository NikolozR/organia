import { TestBed } from '@angular/core/testing';

import { LikedAndCartService } from './liked-and-cart.service';

describe('LikedAndCartService', () => {
  let service: LikedAndCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedAndCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
