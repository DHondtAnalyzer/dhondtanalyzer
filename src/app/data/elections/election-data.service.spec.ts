/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectionDataService } from './election-data.service';

describe('Service: ElectionData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectionDataService]
    });
  });

  it('should ...', inject([ElectionDataService], (service: ElectionDataService) => {
    expect(service).toBeTruthy();
  }));
});
