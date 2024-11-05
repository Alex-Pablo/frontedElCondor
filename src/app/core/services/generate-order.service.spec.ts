import { TestBed } from '@angular/core/testing';

import { GenerateOrderService } from './generate-order.service';

describe('GenerateOrderService', () => {
  let service: GenerateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
