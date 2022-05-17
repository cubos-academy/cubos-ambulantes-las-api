import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddress1652671721628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE if not EXISTS user_address (
        id int unique not null,
        cep varchar(10) null,
        street varchar(150) null,
        number int null,
        complement varchar(50) null,
        district varchar(80) null,
        state varchar(2) null
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_address`);
  }
}
