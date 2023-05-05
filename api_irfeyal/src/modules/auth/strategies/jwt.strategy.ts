import { IJwtPayload } from './../jwt-payload.interface';
import { Usuario } from './../../usuario/entities/usuario.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UnauthorizedException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(Usuario)
    private readonly _authService: Repository<Usuario>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload) {
    const { usuAlias } = payload;
    const user = await this._authService.findOne({
      where: { usuAlias: usuAlias, usuActivo: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
