import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly _zonaService: Repository<Curso>,
    private readonly _authService: AuthService,
  ) {}

  async obtenerCursosPorUsu(headers) {
    try {
      const token = await this._authService.decodeToken(headers);

      const buscarPorCodigo = await this._zonaService.find({
        where: {
          nveId: token.nveId,
        },
      });
      return buscarPorCodigo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
