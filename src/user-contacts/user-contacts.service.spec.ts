import { Test, TestingModule } from '@nestjs/testing';
import { UserContactsService } from './user-contacts.service';

describe('UserContactsService', () => {
  let service: UserContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContactsService],
    }).compile();

    service = module.get<UserContactsService>(UserContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
