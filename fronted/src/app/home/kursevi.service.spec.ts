import { TestBed } from '@angular/core/testing';

import { KurseviService } from './kursevi.service';

describe('KurseviService', () => {
  let service: KurseviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KurseviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
