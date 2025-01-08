import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { EnumPayment } from "../dto/enums/enum-payment";
import { UserEntity } from "src/users/entities/user.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

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

    @ManyToOne(
        () => UserEntity,
        (userEntity) => userEntity.products,
    )
    user: UserEntity[]
}