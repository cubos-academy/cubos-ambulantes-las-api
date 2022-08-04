import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

const userEntityItem = new UserEntity({
  fullName: 'Iv Midium',
  password: '$2a$10$GkC/xzM13kTzMtGyNhUi8.E8CNkuqzHP8XgxhTikPLtUPklJ8dvlO',
});

const signedTokenPayload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6I...';

const createdTokenOutput = {
  message: 'Successfully created token',
  token: signedTokenPayload,
  type: 'Bearer',
  expiresIn: 18000,
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<UserEntity>;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityItem),
          },
        },
        {
          provide: TokenService,
          useValue: {
            sign: jest.fn().mockReturnValue(signedTokenPayload),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should authService be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should userRepository be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should tokenService be defined', () => {
    expect(tokenService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return successfully created token', async () => {
      //Arrange
      const credentialsDto = new CredentialsDto();
      credentialsDto.cpf = '13938958547';
      credentialsDto.password = '40028922';

      //Act
      const result = await authService.signIn(credentialsDto);

      //Assert
      expect(result).toEqual(createdTokenOutput);
      expect(tokenService.sign).toHaveBeenCalledTimes(1);
      expect(tokenService.sign).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should thrown an error', async () => {
      //Arrange
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      //Assert
      expect(authService.signIn).rejects.toThrowError();
    });
  });
});
