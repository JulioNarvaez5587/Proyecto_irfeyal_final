import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Correo asignado' })
  @IsNotEmpty({ message: 'Falta usuAlias' })
  usuAlias: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsNotEmpty({ message: 'Falta usuPassword' })
  usuPassword: string;
}
