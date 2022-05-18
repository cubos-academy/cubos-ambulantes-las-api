import { Test, TestingModule } from '@nestjs/testing';
import { UserContactsController } from './user-contacts.controller';
import { UserContactsService } from './user-contacts.service';

describe('UserContactsController', () => {
  let controller: UserContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserContactsController],
      providers: [UserContactsService],
    }).compile();

    controller = module.get<UserContactsController>(UserContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
