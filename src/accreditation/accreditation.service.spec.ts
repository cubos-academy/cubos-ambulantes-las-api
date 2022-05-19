import { Test, TestingModule } from '@nestjs/testing';
import { AccreditationService } from './accreditation.service';

describe('AccreditationService', () => {
  let service: AccreditationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccreditationService],
    }).compile();

    service = module.get<AccreditationService>(AccreditationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
