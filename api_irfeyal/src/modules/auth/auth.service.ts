import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly _authService: Repository<Usuario>,
    private readonly _jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { usuAlias, usuPassword } = loginDto;
    const usuario: Usuario = await this._authService.findOne({
      where: { usuAlias: usuAlias },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }
    if (!usuario.usuActivo) {
      throw new NotFoundException('El usuario ha sido dado de baja');
    }
    const isMatch = await compare(usuPassword, usuario.usuPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Datos Incorrectos');
    }
    return this.generarJWT(usuario);
  }

  async generarJWT(usuario: IJwtPayload) {
    const payload: IJwtPayload = {
      usuActivo: usuario.usuActivo,
      usuCorreo: usuario.usuCorreo,
      usuFechaRegistro: usuario.usuFechaRegistro,
      usuId: usuario.usuId,
      usuNombre: usuario.usuNombre,
      usuAlias: usuario.usuAlias,
      nveId: usuario.nveId,
    };

    const token = await this._jwtService.sign(payload, {
      expiresIn: '30 days',
    });
    return { ok: true, token };
  }

  async decodeToken(headers): Promise<AuthDto> {
    let decoded = new AuthDto();
    try {
      decoded = await this._jwtService.verify(
        headers.authorization.split(' ')[1],
      );
    } catch (error) {
      return null;
    }
    return plainToInstance(AuthDto, decoded);
  }
}
