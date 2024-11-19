import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductImageEntity } from "./product-image.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ name: 'name', nullable: false, length: 100 })
    name: string

    @Column({ name: 'description', nullable: false })
    description: string

    @Column({ name: 'category', nullable: false })
    category: string

    @Column({ name: 'quantity', nullable: false })
    quantity: number

    @Column({ name: 'price', nullable: false })
    price: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string

    @OneToMany(
        () => ProductImageEntity,
        (productImageEntity) => productImageEntity.product,
        { cascade: true, eager: true }
    )
    image: ProductImageEntity[];
}