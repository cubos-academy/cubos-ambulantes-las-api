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
import { CredentialsDto } from './dto/credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Authenticate user account' })
  @ApiCreatedResponse({
    description: 'Authenticated successfully',
    schema: { example: credentialsSchemaExample },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password incorrect',
  })
  async login(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
