import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  hash: string;

  @OneToOne(() => UserEntity, { cascade: false })
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false })
  userId: number;
}
