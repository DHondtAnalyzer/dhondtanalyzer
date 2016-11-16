/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartyDataService } from './party-data.service';

describe('Service: PartyData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyDataService]
    });
  });

  it('should ...', inject([PartyDataService], (service: PartyDataService) => {
    expect(service).toBeTruthy();
  }));
});
