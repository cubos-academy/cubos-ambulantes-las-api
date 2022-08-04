import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserContactsDto } from './dto/update-user-contact.dto';
import { UserContactsEntity } from './entities/user_contacts.entity';
import { UserContactsController } from './user-contacts.controller';
import { UserContactsService } from './user-contacts.service';

const userContactsEntityItem = new UserContactsEntity();
userContactsEntityItem.id = 1;
userContactsEntityItem.email = 'contato@gmail.com';
userContactsEntityItem.mobilePhone = '81981145555';
userContactsEntityItem.phone = '40028922';

describe('UserContactsController', () => {
  let userContactsController: UserContactsController;
  let userContactsService: UserContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserContactsController],
      providers: [
        UserContactsService,
        {
          provide: UserContactsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userContactsEntityItem),
            update: jest.fn().mockResolvedValue(userContactsEntityItem),
            filter: jest.fn().mockResolvedValue(userContactsEntityItem),
          },
        },
      ],
    }).compile();

    userContactsController = module.get<UserContactsController>(
      UserContactsController,
    );
    userContactsService = module.get<UserContactsService>(UserContactsService);
  });

  it('should be defined', () => {
    expect(userContactsController).toBeDefined();
  });

  it('should be defined', () => {
    expect(userContactsService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user contacts entity', async () => {
      //Arrange
      const req = {
        user: {
          contactsId: 1,
        },
      };

      //Act
      const result = await userContactsController.findOne(req);

      //Assert
      expect(result).toEqual(userContactsEntityItem);
      expect(userContactsService.findOne).toHaveBeenCalledTimes(1);
      expect(userContactsService.filter).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      //Arrange
      jest
        .spyOn(userContactsService, 'findOne')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userContactsController.findOne).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return an user contacts entity', async () => {
      //Arrange
      const req = {
        user: {
          contactsId: 1,
        },
      };
      const updateUserContactDto = new UpdateUserContactsDto();
      updateUserContactDto.email = 'new@email.com';

      //Act
      const result = await userContactsController.update(
        req,
        updateUserContactDto,
      );

      //Assert
      expect(result).toEqual(userContactsEntityItem);
      expect(userContactsService.update).toHaveBeenCalledTimes(1);
      expect(userContactsService.filter).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      //Arrange
      jest
        .spyOn(userContactsService, 'update')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userContactsController.update).rejects.toThrowError();
    });
  });
});
