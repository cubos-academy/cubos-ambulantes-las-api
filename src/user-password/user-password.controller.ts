import { Controller, Body, Put, Req, UseGuards } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { userPasswordControllerDecorators } from './doc/user-password-controller.decorators';

@ApiTags('user')
@Controller('user/password')
export class UserPasswordController {
  constructor(private readonly userPasswordService: UserPasswordService) {}

  @UseGuards(AuthGuard())
  @userPasswordControllerDecorators.update()
  @Put()
  public async update(@Req() req, @Body() data: UpdateUserPasswordDto) {
    const userId: number = req.user.id;

    return this.userPasswordService.update(userId, data).then(() => {
      return {
        message: 'Password updated successfully',
      };
    });
  }
}
