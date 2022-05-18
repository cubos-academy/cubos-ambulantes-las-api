import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { credentialsSchemaExample } from 'src/auth/doc/credentials-example.schema';
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
    return this.authService.signIn(credentialsDto).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
