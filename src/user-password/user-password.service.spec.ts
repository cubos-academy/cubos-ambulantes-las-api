import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserPasswordService } from './user-password.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

const UserEntityItem = new UserEntity({
  password: '$2a$10$GkC/xzM13kTzMtGyNhUi8.E8CNkuqzHP8XgxhTikPLtUPklJ8dvlO',
});

describe('UserPasswordService', () => {
  let userPasswordService: UserPasswordService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPasswordService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(UserEntityItem),
            save: jest.fn().mockResolvedValue(UserEntityItem),
          },
        },
      ],
    }).compile();

    userPasswordService = module.get<UserPasswordService>(UserPasswordService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userPasswordService).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('update', () => {
    it('should return an user entity', async () => {
      //Arrange
      const userId = 22;
      const data = new UpdateUserPasswordDto();
      data.newPassword = '40038933';
      data.oldPassword = '40028922';

      //Act
      const result = await userPasswordService.update(userId, data);

      //Assert
      expect(result).toEqual(UserEntityItem);
    });

    it('should throw an error', async () => {
      //Arrange
      const userEntityWithOtherPassword = new UserEntity({
        password: 'RANDOM',
      });
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(userEntityWithOtherPassword);

      const userId = 1;
      const updateUserPasswordDto = new UpdateUserPasswordDto();
      updateUserPasswordDto.newPassword = 'asdhaskdas';
      updateUserPasswordDto.oldPassword = 'ashduasdh';

      expect(
        userPasswordService.update(userId, updateUserPasswordDto),
      ).rejects.toThrowError();
    });
  });
});
