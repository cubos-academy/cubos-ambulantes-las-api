import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description sign a received payload and generate a valid token.
   * @param payload object containing user id
   * @returns access token
   */
  public sign(payload: { id: number }): string {
    return this.jwtService.sign(payload);
  }

  /**
   * @description save an access token on database
   * @param hash generated access token from sign method
   * @param userId user id from 'users' table
   */
  public async save(hash: string, userId: number): Promise<void> {
    const token = await this.tokenRepository.findOne({ userId });

    if (token) {
      await this.tokenRepository.update(token.id, {
        hash,
      });
    } else {
      await this.tokenRepository.insert({
        hash,
        userId,
      });
    }
  }

  /**
   * @description refresh an existing token
   * @param oldToken most recent token from user
   * @throws UnauthorizedException
   */
  public async refreshToken(oldToken: string): Promise<object> {
    const storedToken = await this.tokenRepository.findOne(
      { hash: oldToken },
      { relations: ['user'] },
    );

    if (storedToken) {
      const user = storedToken.user;
      const payload = {
        id: user.id,
      };

      const generatedToken = this.sign(payload);
      this.save(generatedToken, user.id);

      return {
        message: 'Successfully refreshed token',
        generatedToken,
        type: 'Bearer',
        expiresIn: 18000,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
