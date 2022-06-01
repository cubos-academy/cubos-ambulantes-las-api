import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserContactsDto } from './dto/update-user-contact.dto';
import { UserContactsEntity } from './entities/user_contacts.entity';
import { UserContactsService } from './user-contacts.service';

const userContactsEntityItem = new UserContactsEntity();
userContactsEntityItem.email = 'fulano@detal.com';

describe('UserContactsService', () => {
  let userContactsService: UserContactsService;
  let userContactsRepo: Repository<UserContactsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserContactsService,
        {
          provide: getRepositoryToken(UserContactsEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userContactsEntityItem),
            save: jest.fn().mockResolvedValue(userContactsEntityItem),
          },
        },
      ],
    }).compile();

    userContactsService = module.get<UserContactsService>(UserContactsService);
    userContactsRepo = module.get<Repository<UserContactsEntity>>(
      getRepositoryToken(UserContactsEntity),
    );
  });

  it('should be defined', () => {
    expect(userContactsService).toBeDefined();
  });

  it('should be defined', () => {
    expect(userContactsRepo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user contacts entity', async () => {
      //Arrange
      const id = 1;

      //Act
      const result = await userContactsService.findOne(id);

      //Assert
      expect(result).toEqual(userContactsEntityItem);
      expect(userContactsRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a user contacts entity item', async () => {
      //Arrange
      const id = 1;
      const updateContactsDto = new UpdateUserContactsDto();
      updateContactsDto.email = 'new@email.com';

      //Act
      const result = await userContactsService.update(id, updateContactsDto);

      //Assert
      expect(result).toEqual(userContactsEntityItem);
      expect(userContactsRepo.save).toHaveBeenCalledTimes(1);
      expect(userContactsRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
