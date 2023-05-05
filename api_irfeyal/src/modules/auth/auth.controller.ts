import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@UsePipes(ValidationPipe)
@ApiTags('Login')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/usuario/login')
  async loginUsuario(@Body() siginDto: LoginDto) {
    return this.authService.login(siginDto);
  }
}
