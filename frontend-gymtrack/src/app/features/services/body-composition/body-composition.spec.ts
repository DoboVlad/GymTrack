import { TestBed } from '@angular/core/testing';

import { BodyComposition } from './body-composition';

describe('BodyComposition', () => {
  let service: BodyComposition;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyComposition);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
