import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'image_products' })
export class ProductImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'url', nullable: false })
    url: string

    @Column({ name: 'description' })
    description: string

    @ManyToOne(() => ProductEntity, (product) => product.image)
    product: ProductEntity
}