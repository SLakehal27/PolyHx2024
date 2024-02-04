import { TestBed } from '@angular/core/testing';

import { OpenAiVisionService } from './open-ai-vision.service';

describe('OpenAiVisionService', () => {
  let service: OpenAiVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
