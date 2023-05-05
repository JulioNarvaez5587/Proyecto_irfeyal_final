import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('capitulo_pkey', ['capId'], { unique: true })
@Entity('capitulo', { schema: 'public' })
export class Capitulo {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'cap_id' })
  capId: number;

  @Column('character varying', { name: 'cap_nombre' })
  capNombre: string;

  @Column('boolean', { name: 'cap_activo', default: () => 'true' })
  capActivo: boolean;

  @Column('integer', { name: 'cur_id', nullable: true })
  curId: number;

  //@Column('character varying', { name: 'cap_julio' })
  //capJulio: string;
}
