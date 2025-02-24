import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterQuantityNullOption1740405264915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products 
            ALTER COLUMN quantity DROP NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products 
            ALTER COLUMN quantity SET NOT NULL;
        `);
    }

}
