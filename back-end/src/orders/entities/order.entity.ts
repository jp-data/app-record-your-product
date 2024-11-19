import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @Column({ name: 'total', nullable: false })
    total: number

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
    items: OrderItemEntity[];
}