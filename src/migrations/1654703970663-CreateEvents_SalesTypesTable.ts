import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventsSalesTypesTable1654703970663
  implements MigrationInterface
{
  private table = new Table({
    name: 'events_allowed_sales_types_sales_types',
    columns: [
      {
        name: 'eventsId',
        type: 'integer',
        isPrimary: true,
      },
      {
        name: 'salesTypesId',
        type: 'integer',
        isPrimary: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['eventsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'events',
        onDelete: 'CASCADE',
      },
      {
        columnNames: ['salesTypesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sales_types',
        onDelete: 'CASCADE',
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
