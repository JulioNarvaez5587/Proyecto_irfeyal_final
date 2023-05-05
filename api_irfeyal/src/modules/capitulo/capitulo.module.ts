import { Module } from '@nestjs/common';
import { CapituloService } from './capitulo.service';
import { CapituloController } from './capitulo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capitulo } from './entities/capitulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Capitulo])],
  controllers: [CapituloController],
  providers: [CapituloService],
  exports: [CapituloService],
})
export class CapituloModule {}
