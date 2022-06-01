import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressEntity } from '../user-address/entities/user_address.entity';
import { UserContactsEntity } from '../user-contacts/entities/user_contacts.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userEntityItem = new UserEntity({
  id: 1,
  fullName: 'Ivson Emidio',
  cpf: '13938958547',
  password: 'A2SasAs@SAsCA#',
  address: new UserAddressEntity(),
  contacts: new UserContactsEntity(),
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValueOnce(userEntityItem),
            find: jest.fn().mockResolvedValue(userEntityItem),
            update: jest.fn().mockResolvedValueOnce(userEntityItem),
            filter: jest.fn().mockReturnValue(userEntityItem),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an user entity', async () => {
      //Arrange
      const req = {
        user: {
          id: 1,
        },
      };

      //Act
      const result = await userController.findOne(req);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userService.find).toHaveBeenCalledTimes(1);
      expect(userService.find).toHaveBeenCalledWith(req.user.id);
    });

    it('should throw an error when receive response from service', async () => {
      //Arrange
      jest.spyOn(userService, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.findOne).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const createUserDto = new CreateUserDto();
    createUserDto.fullName = 'Ivson Emidio';
    createUserDto.cpf = '13938958574';
    createUserDto.password = 'asi@uhdsSDAS@aksm';
    createUserDto.email = 'random@boitata.com';

    it('should create a new user entity and return', async () => {
      //Act
      const result = await userController.create(createUserDto);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should thorow a error when creating a user entity', () => {
      //Arrange
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.create).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a updated user entity', async () => {
      //Arrange
      const req = {
        user: {
          id: 1,
        },
      };
      const updateUserDto = new UpdateUserDto();
      updateUserDto.fullName = 'Ivson Silva';

      //Act
      const result = await userController.update(req, updateUserDto);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when updating a user entity', () => {
      //Arrange
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.update).rejects.toThrowError();
    });
  });
});
