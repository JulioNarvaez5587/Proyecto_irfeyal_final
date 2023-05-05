import { Module } from '@nestjs/common';
import { NivelEstudioService } from './nivel_estudio.service';
import { NivelEstudioController } from './nivel_estudio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEstudio } from './entities/nivel_estudio.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NivelEstudio]), AuthModule],
  controllers: [NivelEstudioController],
  providers: [NivelEstudioService],
  exports: [NivelEstudioService],
})
export class NivelEstudioModule {}
