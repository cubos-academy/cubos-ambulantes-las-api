import { Test, TestingModule } from '@nestjs/testing';
import { SalesTypesService } from './sales-types.service';

describe('SalesTypesService', () => {
  let service: SalesTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesTypesService],
    }).compile();

    service = module.get<SalesTypesService>(SalesTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
