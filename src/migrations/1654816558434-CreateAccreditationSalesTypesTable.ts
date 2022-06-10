import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccreditationSalesTypesTable1654816558434
  implements MigrationInterface
{
  private table = new Table({
    name: 'accreditations_sales_types_sales_types',
    columns: [
      {
        name: 'accreditationsId',
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
        columnNames: ['accreditationsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accreditations',
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
