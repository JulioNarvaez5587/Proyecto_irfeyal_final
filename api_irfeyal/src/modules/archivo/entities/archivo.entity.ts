import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('archivo_pkey', ['arcId'], { unique: true })
@Entity('archivo', { schema: 'public' })
export class Archivo {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'arc_id' })
  arcId: number;

  @Column('character varying', { name: 'arc_nombre' })
  arcNombre: string;

  @Column('boolean', { name: 'arc_activo', default: () => 'true' })
  arcActivo: boolean;

  @Column('integer', { name: 'cap_id', nullable: true })
  capId: number;
}
