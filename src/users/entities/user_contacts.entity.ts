import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_contacts')
export class UserContacts {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  mobile_phone: string;
}
