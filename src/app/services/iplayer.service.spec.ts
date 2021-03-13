import { TestBed } from '@angular/core/testing';

import { IPlayerService } from './iplayer.service';

describe('IPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IPlayerService = TestBed.get(IPlayerService);
    expect(service).toBeTruthy();
  });
});
