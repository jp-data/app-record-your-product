import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserId1739541878392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products ADD COLUMN "userId" UUID NOT NULL
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products DROP COLUMN "userId"
            `)
    }

}
