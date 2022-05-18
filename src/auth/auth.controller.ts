import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { authControllerSwaggerDecorators } from './doc/auth-controller.decorators';
import { CredentialsDto } from './dto/credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @authControllerSwaggerDecorators.post()
  async login(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto);
  }
}
