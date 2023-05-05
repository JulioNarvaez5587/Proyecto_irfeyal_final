import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NivelEstudio } from './entities/nivel_estudio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NivelEstudioService {
  constructor(
    @InjectRepository(NivelEstudio)
    private readonly _nivelEstudioService: Repository<NivelEstudio>,
    private readonly _authService: AuthService,
  ) {}
  async obtenerNivelPorUsuario(headers) {
    try {
      const token = await this._authService.decodeToken(headers);
      const buscarUsuario = await this._nivelEstudioService.findOne({
        where: {
          nveId: token.nveId,
        },
      });
      return buscarUsuario;
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
