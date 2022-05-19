import { Test, TestingModule } from '@nestjs/testing';
import { AccreditationController } from './accreditation.controller';
import { AccreditationService } from './accreditation.service';

describe('AccreditationController', () => {
  let controller: AccreditationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccreditationController],
      providers: [AccreditationService],
    }).compile();

    controller = module.get<AccreditationController>(AccreditationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
