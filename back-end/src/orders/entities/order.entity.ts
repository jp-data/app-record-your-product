import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { EnumPayment } from "../dto/enums/enum-payment";
import { UserEntity } from "../../users/entities/user.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date

    @Column({ name: 'subtotal', type: 'float' })
    subtotal: number

    @Column({ name: 'discount', type: 'float' })
    discount: number

    @Column({ name: 'total', nullable: false, type: 'float' })
    total: number

    @Column({ name: 'payment', nullable: false, type: 'text' })
    payment: EnumPayment

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true, onDelete: 'CASCADE' })
    items: OrderItemEntity[];

    @Column({ type: 'uuid', nullable: false })
    userId: string

    @ManyToOne(
        () => UserEntity,
        (userEntity) => userEntity.orders,
    )
    @JoinColumn({ name: 'userId' })
    user: UserEntity
}