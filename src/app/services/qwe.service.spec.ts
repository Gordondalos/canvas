import { TestBed, inject } from '@angular/core/testing';

import { QweService } from './qwe.service';

describe('QweService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QweService]
    });
  });

  it('should be created', inject([QweService], (service: QweService) => {
    expect(service).toBeTruthy();
  }));
});
