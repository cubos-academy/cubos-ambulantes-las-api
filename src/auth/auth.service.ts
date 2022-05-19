import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PasswordHelper } from 'src/helpers/password-helper';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
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
      const jwtPayload = {
        id: user.id,
      };

      const token = this.jwtService.sign(jwtPayload);
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
