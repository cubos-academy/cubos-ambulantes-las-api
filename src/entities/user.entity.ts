import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccreditationEntity } from './accreditation.entity';
import { EventEntity } from './event-entity';
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

  @OneToOne(() => UserAddressEntity, {
    cascade: true,
  })
  @JoinColumn()
  address: UserAddressEntity;

  @Column({ nullable: false })
  addressId: number;

  @OneToOne(() => UserContactsEntity, {
    cascade: true,
  })
  @JoinColumn()
  contacts: UserContactsEntity;

  @Column({ nullable: false })
  contactsId: number;

  @ManyToMany(() => EventEntity, {
    cascade: true,
  })
  @JoinTable()
  events: EventEntity[];

  @OneToMany(() => AccreditationEntity, (accredidation) => accredidation.user)
  accreditations: AccreditationEntity[];
}
