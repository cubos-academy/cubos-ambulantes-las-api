import { SalesTypeEntity } from 'src/sales-types/entities/sales-type.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from '../../events/entities/event-entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'accreditations' })
export class AccreditationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  location: string;

  @Column({ type: 'smallint', nullable: true })
  status: number;

  @Column({ type: 'timestamp', default: new Date() })
  accreditedAt: Date;

  @ManyToMany(() => SalesTypeEntity, { onDelete: 'CASCADE' })
  @JoinTable()
  salesTypes: SalesTypeEntity[];

  @ManyToOne(() => EventEntity, { cascade: true })
  event: EventEntity;

  @ManyToOne(() => UserEntity, (user) => user.accreditations, { cascade: true })
  user: UserEntity;
}
