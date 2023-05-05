import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('curso_pkey', ['curId'], { unique: true })
@Entity('curso', { schema: 'public' })
export class Curso {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'cur_id' })
  curId: number;

  @Column('character varying', { name: 'cur_nombre' })
  curNombre: string;

  @Column('boolean', { name: 'cur_activo', default: () => 'true' })
  curActivo: boolean;

  @Column('integer', { name: 'nve_id', nullable: true })
  nveId: number;
}
