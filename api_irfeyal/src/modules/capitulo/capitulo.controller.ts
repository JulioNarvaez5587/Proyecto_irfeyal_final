import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CapituloService } from './capitulo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Capitulo')
@ApiBearerAuth()
@Controller('capitulo')
export class CapituloController {
  constructor(private readonly capituloService: CapituloService) {}

  @Get('/:curId')
  async obtenerCapitulosPorCurso(@Param('curId') curId: number) {
    return await this.capituloService.obtenerCapituloPorCurso(curId);
  }
}
