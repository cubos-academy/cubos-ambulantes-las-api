import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sales_types' })
export class SalesTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', unique: false, nullable: true })
  description: string;

  constructor(salesType?: Partial<SalesTypeEntity>) {
    this.id = salesType?.id;
    this.name = salesType?.name;
    this.description = salesType?.description;
  }
}
