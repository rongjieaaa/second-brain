import { TestBed } from '@angular/core/testing';

import { RegularExpressionService } from './regular-expression.service';

describe('RegularExpressionService', () => {
  let service: RegularExpressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularExpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
