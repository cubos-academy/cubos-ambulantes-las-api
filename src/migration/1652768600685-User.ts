import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1652671966478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE if not EXISTS users (
      id serial primary key,
      fullName varchar(255) not null,
      rg varchar(50) null,
      cpf varchar(11) unique not null,
      profilePictureUrl varchar(255) null,
      password varchar(255) not null,
      birthDate timestamp null,
      createdAt timestamp not null,
      contactId integer not null,
      addressId integer not null,
      constraint fk_contact foreign key(contactId) references user_contacts(id),
      constraint fk_address foreign key(addressId) references user_address(id)
   );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
