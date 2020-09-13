/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiBackOfficeService } from './api-back-office.service';

describe('Service: ApiBackOffice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBackOfficeService]
    });
  });

  it('should ...', inject([ApiBackOfficeService], (service: ApiBackOfficeService) => {
    expect(service).toBeTruthy();
  }));
});
