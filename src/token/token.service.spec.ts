import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './token.service';

const generatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const refreshTokenOutput = {
  message: 'Successfully refreshed token',
  generatedToken,
  type: 'Bearer',
  expiresIn: 18000,
};
const tokenEntityItem = new TokenEntity();
tokenEntityItem.hash = '@$ey...ashduyashduasdhasu';
tokenEntityItem.user = new UserEntity({ id: 22 });

describe('TokenService', () => {
  let tokenService: TokenService;
  let tokenRepository: Repository<TokenEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: getRepositoryToken(TokenEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(tokenEntityItem),
            update: jest.fn(),
            insert: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(generatedToken),
          },
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
    tokenRepository = module.get<Repository<TokenEntity>>(
      getRepositoryToken(TokenEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should tokenService be defined', () => {
    expect(tokenService).toBeDefined();
  });

  it('should tokenRepository be defined', () => {
    expect(tokenRepository).toBeDefined();
  });

  it('should jwtService be defined', () => {
    expect(jwtService).toBeDefined();
  });

  describe('sign', () => {
    it('should return a signed payload', () => {
      //Arrange
      const payload = {
        id: 22,
      };

      //Act
      const result = tokenService.sign(payload);

      //Assert
      expect(result).toEqual(generatedToken);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });

  describe('refreshToken', () => {
    it('should return refreshToken object', async () => {
      //Arrange
      const oldToken = '#$ey23alsjkas@ca;saasda';

      //Act
      const result = await tokenService.refreshToken(oldToken);

      //Assert
      expect(result).toEqual(refreshTokenOutput);
    });

    it('should throw an erro', () => {
      //Arrange
      jest.spyOn(tokenRepository, 'findOne').mockRejectedValue(new Error());

      //Assert
      expect(tokenService.refreshToken).rejects.toThrowError();
    });
  });
});
