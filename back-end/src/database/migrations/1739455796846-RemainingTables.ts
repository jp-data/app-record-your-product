import { MigrationInterface, QueryRunner } from "typeorm";

export class RemainingTables1739455796846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR NOT NULL,
                category VARCHAR NOT NULL,
                quantity INTEGER NOT NULL,
                price FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                deleted_at TIMESTAMP,
                userId UUID,
                CONSTRAINT fk_product_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                created_at VARCHAR NOT NULL,
                subtotal FLOAT NOT NULL,
                discount FLOAT NOT NULL,
                total FLOAT NOT NULL,
                payment TEXT NOT NULL,
                userId UUID,
                CONSTRAINT fk_order_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE orders_itens (
                id SERIAL PRIMARY KEY,
                product_id INTEGER NOT NULL,
                id_order INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                CONSTRAINT fk_order_item_order FOREIGN KEY (id_order) REFERENCES orders(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE orders_itens`);
        await queryRunner.query(`DROP TABLE orders`);
        await queryRunner.query(`DROP TABLE products`);
    }

}
