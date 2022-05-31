import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddressEntity } from '../user-address/entities/user_address.entity';
import { UserContactsEntity } from '../user-contacts/entities/user_contacts.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

const userEntityItem: UserEntity = new UserEntity({
  id: 1,
  fullName: 'Ivson Emidio',
  cpf: '13938947472',
  password: 'pass@cub#ran123',
  contacts: new UserContactsEntity(),
  address: new UserAddressEntity(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(userEntityItem),
            findOne: jest.fn().mockResolvedValue(userEntityItem),
            find: jest.fn().mockResolvedValue(userEntityItem),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should return a UserEntity successfully on creating user', async () => {
      //Arrange
      const createUserDto = new CreateUserDto();
      createUserDto.fullName = 'Ivson Emidio';
      createUserDto.cpf = '13938947488';
      createUserDto.email = 'contato@gmail.com';
      createUserDto.password = '946788CA';

      //Act
      const result = await userService.create(createUserDto);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should return an item of user entity', async () => {
      //Arrange
      const id = 1;

      //Act
      const result = await userService.find(id);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user entity and return back the updated value', async () => {
      //Arrange
      const id = 1;
      const data: UpdateUserDto = {
        id: id,
        fullName: 'Fernanda Morais',
        cpf: '13938947588',
        password: 'Skska@ASsl',
      };

      //Act
      const result = await userService.update(id, data);

      //Assert
      expect(result).toEqual(userEntityItem);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('filter', () => {
    it('should filter an user entity and remove unecessary columns', () => {
      //Arrange
      const user = new UserEntity({
        password: '2323@wdasd@saBC',
        fullName: 'Ivson',
      });

      //Act
      jest
        .spyOn(userService, 'filter')
        .mockImplementation(() => userEntityItem);

      //Assert
      expect(userService.filter(user)).toEqual(userEntityItem);
    });
  });
});
