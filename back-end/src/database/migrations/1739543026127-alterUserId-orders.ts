import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserIdOrders1739543026127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orders ADD COLUMN "userId" UUID NOT NULL
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products DROP COLUMN "userId"
            `)
    }

}
