import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Res,
  Headers,
} from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Archivo')
@ApiBearerAuth()
@Controller('archivo')
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Get('/:capId')
  async obtenerArchivosPorCapitulo(@Param('capId') capId: number) {
    return await this.archivoService.obtenerArchivosPorCapitulo(capId);
  }

  @Get('/music/download/:nameMusic')
  async descargarAudio(@Param('nameMusic') nameExcel) {
    return await this.archivoService.obtenerAudioDeGoogleDrive(nameExcel);
  }
}
