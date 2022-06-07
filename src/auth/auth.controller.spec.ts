import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

const authOutput = {
  message: 'Successfully created token',
  token: 'eyJhbGciOiJIUzI1NiIsInR5c...',
  type: 'Bearer',
  expiresIn: 18000,
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(authOutput),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return successfully created login token', async () => {
      //Arrange
      const credentials = new CredentialsDto();
      credentials.cpf = '13938958540';
      credentials.password = 'SrMiag2332';

      //Act
      const result = await authController.login(credentials);

      //Assert
      expect(result).toEqual(authOutput);
      expect(authService.signIn).toHaveBeenCalledTimes(1);
    });

    it('should thrown an error', () => {
      //Arrange
      jest.spyOn(authService, 'signIn').mockRejectedValueOnce(new Error());

      //Assert
      expect(authController.login).rejects.toThrowError();
    });
  });
});
