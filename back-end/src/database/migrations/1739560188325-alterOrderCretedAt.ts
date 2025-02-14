import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderCretedAt1739560188325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orders
            ALTER COLUMN created_at TYPE TIMESTAMP
            USING created_at::TIMESTAMP;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orders 
            ALTER COLUMN created_at TYPE VARCHAR;
        `);
    }

}
