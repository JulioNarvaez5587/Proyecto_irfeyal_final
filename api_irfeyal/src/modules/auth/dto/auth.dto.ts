import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthDto {
  @Expose()
  usuId: number;

  @Expose()
  usuNombre: string;

  @Expose()
  usuCorreo: string;

  @Expose()
  usuActivo: boolean;

  @Expose()
  usuFechaRegistro: Date | null;

  @Expose()
  nveId: number;
}
