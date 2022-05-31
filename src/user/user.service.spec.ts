import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAddressEntity } from '../user-address/entities/user_address.entity';
import { UserContactsEntity } from '../user-contacts/entities/user_contacts.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

const userEntityItem: UserEntity = new UserEntity({
  id: 1,
  fullName: 'Ivson Emidio',
  cpf: '13938947472',
  password: 'asdjsaidj2232',
  contacts: new UserContactsEntity(),
  address: new UserAddressEntity(),
});

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityItem),
            save: jest.fn().mockResolvedValue(userEntityItem),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should return a UserEntity successfully on creating user', async () => {
      //set
      const createUserDto = new CreateUserDto();
      createUserDto.fullName = 'Ivson Emidio';
      createUserDto.cpf = '13938947488';
      createUserDto.email = 'contato@gmail.com';
      createUserDto.password = '946788CA';

      //act
      const result = await userService.create(createUserDto);

      //assert
      expect(result).toBe(userEntityItem);
    });
  });
});
