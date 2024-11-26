import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from '../../products/entities/product.entity'
import { OrderEntity } from "./order.entity";

@Entity('orders_itens')
export class OrderItemEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => ProductEntity, (product) => product.id, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({ name: 'id_order' })
    order: OrderEntity;

    @Column()
    quantity: number;
}