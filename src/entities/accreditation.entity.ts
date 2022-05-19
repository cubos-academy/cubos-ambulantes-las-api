import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event-entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'accreditations' })
export class AccreditationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  location: string;

  @Column({ type: 'smallint', nullable: true })
  salesType: number;

  @Column({ type: 'smallint', nullable: true })
  status: number;

  @Column({ type: 'timestamp', default: new Date() })
  accreditedAt: Date;

  @ManyToOne(() => EventEntity, { cascade: true })
  event: EventEntity;

  @ManyToOne(() => UserEntity, (user) => user.accreditations, { cascade: true })
  user: UserEntity;
}
