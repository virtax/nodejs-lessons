import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1736275927466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "users"
        (
         id serial,
         name text NOT NULL,
         email text NOT NULL,
         age integer NOT NULL,
         salary integer,
         primary key (id)
        )
        `,
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `DROP TABLE "users"`,
      )
    }


}
