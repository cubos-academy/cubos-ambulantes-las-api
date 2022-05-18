import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddressEntity } from './user_address.entity';
import { UserContactsEntity } from './user_contacts.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  rg: string;

  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  cpf: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profilePictureUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  birthDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @OneToOne(() => UserAddressEntity)
  @JoinColumn()
  address: UserAddressEntity;

  @OneToOne(() => UserContactsEntity)
  @JoinColumn()
  contacts: UserContactsEntity;
}
