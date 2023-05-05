import {
  Controller,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Headers,
  Get,
} from '@nestjs/common';
import { NivelEstudioService } from './nivel_estudio.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Nivel Estudio')
@ApiBearerAuth()
@Controller('nivel-estudio')
export class NivelEstudioController {
  constructor(private readonly nivelEstudioService: NivelEstudioService) {}
  @Get('')
  async obtenerNivelEstudioPorUsuario(@Headers() headers) {
    return await this.nivelEstudioService.obtenerNivelPorUsuario(headers);
  }
}
