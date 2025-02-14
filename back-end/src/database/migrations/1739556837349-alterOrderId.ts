import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderId1739556837349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE products ALTER COLUMN "userId" DROP NOT NULL;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products ALTER COLUMN "userId" SET NOT NULL;
        `);
    }

}
