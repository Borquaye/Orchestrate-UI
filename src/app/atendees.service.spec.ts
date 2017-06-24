import { TestBed, inject } from '@angular/core/testing';

import { AtendeesService } from './atendees.service';

describe('AtendeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtendeesService]
    });
  });

  it('should be created', inject([AtendeesService], (service: AtendeesService) => {
    expect(service).toBeTruthy();
  }));
});
