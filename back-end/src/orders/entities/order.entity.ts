import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { EnumPayment } from "../dto/enums/enum-payment";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'subtotal' })
    subtotal: number

    @Column({ name: 'discount' })
    discount: number

    @Column({ name: 'total', nullable: false })
    total: number

    @Column({ name: 'payment', nullable: false, type: 'text' })
    payment: EnumPayment

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true, onDelete: 'CASCADE' })
    items: OrderItemEntity[];
}