import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { NivelEstudioModule } from '../nivel_estudio/nivel_estudio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo]), NivelEstudioModule],
  controllers: [ArchivoController],
  providers: [ArchivoService],
  exports: [ArchivoService],
})
export class ArchivoModule {}
