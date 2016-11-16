/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistrictDataService } from './district-data.service';

describe('Service: DistrictData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistrictDataService]
    });
  });

  it('should ...', inject([DistrictDataService], (service: DistrictDataService) => {
    expect(service).toBeTruthy();
  }));
});
