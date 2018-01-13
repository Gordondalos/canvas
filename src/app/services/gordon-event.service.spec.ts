import { TestBed, inject } from '@angular/core/testing';

import { GordonEventService } from './gordon-event.service';

describe('GordonEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GordonEventService]
    });
  });

  it('should be created', inject([GordonEventService], (service: GordonEventService) => {
    expect(service).toBeTruthy();
  }));
});
