import { TestBed } from '@angular/core/testing';

import { MapthemeService } from './maptheme.service';

describe('MapthemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapthemeService = TestBed.get(MapthemeService);
    expect(service).toBeTruthy();
  });
});
