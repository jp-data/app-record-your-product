import 'reflect-metadata'
import { Exclude } from "class-transformer";
import { OrderEntity } from "../../orders/entities/order.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'name',
        length: 100,
        nullable: false,
        type: 'string'
    })
    name: string

    @Column({
        name: 'email',
        length: 70,
        nullable: false,
    })
    email: string

    @Exclude()
    @Column({
        name: 'password',
        length: 250,
        nullable: false,
    })
    password: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string

    @OneToMany(
        () => ProductEntity,
        (productEntity) => productEntity.user
    )
    products: ProductEntity[]

    @OneToMany(
        () => OrderEntity,
        (orderEntity) => orderEntity.user
    )
    orders: OrderEntity[]
}