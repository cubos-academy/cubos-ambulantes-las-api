import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserPasswordController } from './user-password.controller';
import { UserPasswordService } from './user-password.service';

const userEntityItem = new UserEntity({ fullName: 'Ivson' });

describe('UserPasswordController', () => {
  let userPasswordController: UserPasswordController;
  let userPasswordService: UserPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserPasswordController],
      providers: [
        {
          provide: UserPasswordService,
          useValue: { update: jest.fn().mockResolvedValue(userEntityItem) },
        },
      ],
    }).compile();

    userPasswordController = module.get<UserPasswordController>(
      UserPasswordController,
    );
    userPasswordService = module.get<UserPasswordService>(UserPasswordService);
  });

  it('should be defined', () => {
    expect(userPasswordController).toBeDefined();
  });

  it('should be defined', () => {
    expect(userPasswordService).toBeDefined();
  });

  describe('update', () => {
    it('should return an user entity item', async () => {
      //Arrange
      const req = {
        user: {
          id: 1,
        },
      };
      const data = new UpdateUserPasswordDto();
      data.oldPassword = 'asdjkasdjasdas';
      data.newPassword = 'asdhusaudhuwhq';

      const expectedOutput = {
        message: 'Password updated successfully',
      };

      //Act
      const result = await userPasswordController.update(req, data);

      //Assert
      expect(result).toEqual(expectedOutput);
      expect(userPasswordService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      //Arrange
      jest
        .spyOn(userPasswordService, 'update')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userPasswordController.update).rejects.toThrowError();
    });
  });
});
