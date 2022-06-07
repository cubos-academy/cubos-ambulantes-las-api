import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

const generatedToken = '';
const refreshedToken = {
  message: 'Successfully refreshed token',
  generatedToken,
  type: 'Bearer',
  expiresIn: 18000,
};

describe('TokenController', () => {
  let tokenController: TokenController;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [
        {
          provide: TokenService,
          useValue: {
            refreshToken: jest.fn().mockResolvedValue(refreshedToken),
          },
        },
      ],
    }).compile();

    tokenController = module.get<TokenController>(TokenController);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(tokenController).toBeDefined();
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  describe('refresh', () => {
    it('should return refreshed token', async () => {
      //Arrange
      const updateTokenDto = new UpdateTokenDto();
      updateTokenDto.hash = '$ey2232uyhquhduhasudhsadasdad';

      //Act
      const result = await tokenController.update(updateTokenDto);

      //Assert
      expect(result).toEqual(refreshedToken);
      expect(tokenService.refreshToken).toHaveBeenCalledTimes(1);
    });
  });
});
