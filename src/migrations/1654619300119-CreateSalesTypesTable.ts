import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSalesTypesTable1654619300119 implements MigrationInterface {
  private table = new Table({
    name: 'sales_types',
    columns: [
      {
        name: 'id',
        type: 'serial',
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'description',
        type: 'text',
        isUnique: false,
        isNullable: true,
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
