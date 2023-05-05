import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CursoService } from './curso.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Curso')
@ApiBearerAuth()
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('/')
  async obtenerCursosPorUsuario(@Headers() headers) {
    return await this.cursoService.obtenerCursosPorUsu(headers);
  }
}
