import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('nivel_estudio_pkey', ['nveId'], { unique: true })
@Entity('nivel_estudio', { schema: 'public' })
export class NivelEstudio {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'nve_id' })
  nveId: number;

  @Column('character varying', { name: 'nve_nombre' })
  nveNombre: string;

  @Column('boolean', { name: 'nve_activo', default: () => 'true' })
  nveActivo: boolean;

  @Column('timestamptz', { name: 'nve_fecha_registro', nullable: true })
  nveFechaRegistro: Date | null;

  @Column('character varying', { name: 'nve_descripcion' })
  nveDescripcion: string;
}
