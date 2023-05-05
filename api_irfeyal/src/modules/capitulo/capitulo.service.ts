import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capitulo } from './entities/capitulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CapituloService {
  constructor(
    @InjectRepository(Capitulo)
    private readonly _capituloService: Repository<Capitulo>,
  ) {}

  async obtenerCapituloPorCurso(curId: number) {
    try {
      const buscarPorCodigo = await this._capituloService.find({
        where: {
          curId: curId,
        },
      });
      return buscarPorCodigo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
