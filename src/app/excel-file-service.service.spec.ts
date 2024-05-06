import { TestBed } from '@angular/core/testing';

import { ExcelFileServiceService } from './excel-file-service.service';

describe('ExcelFileServiceService', () => {
  let service: ExcelFileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelFileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
