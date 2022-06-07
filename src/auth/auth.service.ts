import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PasswordHelper } from '../helpers/password-helper';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  public async signIn(credentialsDto: CredentialsDto) {
    const { cpf, password: receivedPassword } = credentialsDto;
    const user = await this.userRepository.findOne({ cpf });

    if (!user) {
      throw new NotFoundException('Not found an user with this cpf');
    }

    const userPassword = user.password;
    const isPasswordCorrect = await PasswordHelper.compare(
      receivedPassword,
      userPassword,
    );

    if (isPasswordCorrect) {
      const tokenPayload = {
        id: user.id,
      };

      const token = this.tokenService.sign(tokenPayload);
      this.tokenService.save(token, user.id);

      return {
        message: 'Successfully created token',
        token,
        type: 'Bearer',
        expiresIn: 18000,
      };
    } else {
      throw new UnauthorizedException('Incorrect password');
    }
  }
}
