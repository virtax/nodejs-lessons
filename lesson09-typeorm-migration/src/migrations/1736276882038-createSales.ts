import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSales1736276882038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "sales"
        (
         id serial,
         product text NOT NULL,
         amount integer NOT NULL,
         price money NOT NULL,
         userid integer NOT NULL,
         primary key (id)
        )
        `,
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `DROP TABLE "sales"`,
      )
    }

}
