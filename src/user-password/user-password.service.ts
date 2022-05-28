import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from 'src/helpers/password-helper';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserPasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async update(
    userId: number,
    data: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    const { oldPassword, newPassword } = data;
    const user = await this.userRepository.findOne(userId);

    const isPasswordCorrect = await PasswordHelper.compare(
      oldPassword,
      user.password,
    );

    if (isPasswordCorrect) {
      const hashNewPassword = await PasswordHelper.hash(newPassword);
      user.password = hashNewPassword;

      return this.userRepository.save(user);
    } else {
      throw new UnauthorizedException('Old password are incorrect');
    }
  }
}
