import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderCretedAt1739563468053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orders
            ALTER COLUMN created_at SET DEFUALT NOW(),
            ALTER COLUMN created_At SET NOT NULL,
            ALTER COLUMN created_at TYPE TIMESTAMP
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE orders 
            ALTER COLUMN created_at DROP DEFAULT,
            ALTER COLUMN created_at DROP NOT NULL;
        `);

    }

}
