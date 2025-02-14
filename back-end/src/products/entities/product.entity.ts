import 'reflect-metadata'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
}
    from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ name: 'name', nullable: false, length: 100, type: 'varchar' })
    name: string

    @Column({ name: 'description', nullable: false, type: 'varchar' })
    description: string

    @Column({ name: 'category', nullable: false, type: 'varchar' })
    category: string

    @Column({ name: 'quantity', nullable: false, type: 'integer' })
    quantity: number

    @Column({ name: 'price', nullable: false, type: 'float' })
    price: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string

    @Column({ type: 'uuid', nullable: false })
    userId: string

    @ManyToOne(
        () => UserEntity,
        (userEntity) => userEntity.products,
    )
    @JoinColumn({ name: 'userId' })
    user: UserEntity
}