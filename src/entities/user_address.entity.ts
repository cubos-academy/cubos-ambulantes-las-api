import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_address' })
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  street: string;

  @Column({ type: 'integer', nullable: true })
  number: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  complement: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  state: string;
}
