import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_contacts')
export class UserContactsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  mobilePhone: string;
}
