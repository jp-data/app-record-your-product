import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


export class ProductImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'url', nullable: false })
    url: string

    @Column({ name: 'description' })
    description: string

    @OneToOne(() => ProductEntity, (product) => product.image)
    product: ProductEntity
}