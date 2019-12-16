/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlterifyService } from './Alterify.service';

describe('Service: Alterify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlterifyService]
    });
  });

  it('should ...', inject([AlterifyService], (service: AlterifyService) => {
    expect(service).toBeTruthy();
  }));
});
