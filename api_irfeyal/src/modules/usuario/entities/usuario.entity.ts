import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('usuario_pkey', ['usuId'], { unique: true })
@Entity('usuario', { schema: 'public' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'usu_id' })
  usuId: number;

  @Column('character varying', { name: 'usu_alias' })
  usuAlias: string;

  @Column('character varying', { name: 'usu_nombre' })
  usuNombre: string;

  @Column('character varying', { name: 'usu_correo' })
  usuCorreo: string;

  @Column('character varying', { name: 'usu_password' })
  usuPassword: string;

  @Column('boolean', { name: 'usu_activo', default: () => 'true' })
  usuActivo: boolean;

  @Column('timestamptz', { name: 'usu_fecha_registro', nullable: true })
  usuFechaRegistro: Date | null;

  @Column('integer', { name: 'nve_id', nullable: true })
  nveId: number;
}
