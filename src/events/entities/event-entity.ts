import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  imageUrl: string;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ type: 'smallint', nullable: false })
  status: number;
}

export enum eventStatus {
  scheduled = 1,
  inProgress,
  finished,
}

export const allowedStatus = [
  `${eventStatus.scheduled}`,
  `${eventStatus.inProgress}`,
  `${eventStatus.finished}`,
];
