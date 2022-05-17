import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserContacts1652671956478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE if not EXISTS user_contacts (
        id int unique not null,
        email varchar(255) unique not null,
        phone varchar(13) null,
        mobilePhone varchar(13) null
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_contacts`);
  }
}
