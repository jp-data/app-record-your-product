import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUderId1739540967187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
             ALTER TABLE products ADD COLUMN "userId" UUID NOT NULL;
            ALTER TABLE products ADD CONSTRAINT fk_product_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products DROP CONSTRAINT fk_product_user;
            ALTER TABLE products DROP COLUMN "userId";
        `);
    }

}
