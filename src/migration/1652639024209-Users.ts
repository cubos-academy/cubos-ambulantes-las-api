import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1652639024209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE if not EXISTS users (
      id serial primary key,
      full_name varchar(255) not null,
      rg varchar(50) null,
      cpf varchar(11) unique not null,
      profile_picture_url varchar(255) null,
      password varchar(255) not null,
      birth_date timestamp null,
      created_at timestamp not null
   );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
