import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { CursoModule } from './modules/curso/curso.module';
import { NivelEstudioModule } from './modules/nivel_estudio/nivel_estudio.module';
import { CapituloModule } from './modules/capitulo/capitulo.module';
import { ArchivoModule } from './modules/archivo/archivo.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST_DB: Joi.string().required(),
        DBNAME: Joi.string().required(),
        USERNAMEDB: Joi.string().required(),
        PASSWORDDB: Joi.string().required(),
        PORTDB: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ConfigModule,
    UsuarioModule,
    AuthModule,
    CursoModule,
    NivelEstudioModule,
    CapituloModule,
    ArchivoModule,
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get<number>('PORT') || 3000;
  }
}
