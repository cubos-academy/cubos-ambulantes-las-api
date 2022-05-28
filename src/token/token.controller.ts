import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { tokenControllerDecorators } from './doc/token-controller.decorators';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenService } from './token.service';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  @tokenControllerDecorators.update()
  update(@Body() updateTokenDto: UpdateTokenDto) {
    const hash = updateTokenDto.hash;
    return this.tokenService.refreshToken(hash);
  }
}
