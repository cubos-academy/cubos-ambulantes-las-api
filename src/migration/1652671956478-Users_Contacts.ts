import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersContacts1652671956478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE if not EXISTS user_contacts (
        user_id int unique not null,
        email varchar(255) unique not null,
        phone varchar(13) null,
        mobile_phone varchar(13) null,
        constraint fk_user foreign key(user_id) references users(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_contacts`);
  }
}
