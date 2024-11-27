import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ProductEntity } from "src/products/entities/product.entity";
import { OrderItemEntity } from "./entities/order-item.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderItemEntity) private itemRepository: Repository<OrderItemEntity>
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        let subtotalPrice = 0
        const discount = createOrderDto.discount || 0

        const orderedItems = await Promise.all(
            createOrderDto.items.map(async (itemDto) => {
                const product = await this.productRepository.findOneBy({
                    id: itemDto.product_id
                })
                if (!product) {
                    throw new NotFoundException(`Product with ID ${itemDto.product_id} not found`)
                }
                subtotalPrice += product.price * itemDto.quantity

                const allProducts = this.itemRepository.create({
                    product,
                    quantity: itemDto.quantity
                })
                return this.itemRepository.save(allProducts)
            })
        )
        const totalPrice = subtotalPrice - discount

        const orderWithItems = this.orderRepository.create({
            subtotal: subtotalPrice,
            total: totalPrice,
            discount,
            payment: createOrderDto.payment,
            items: orderedItems
        })
        return this.orderRepository.save(orderWithItems)
    }

    async getSales() {
        const totalSales = await this.orderRepository.query(
            `SELECT 
                ord.created_at AS date,
                GROUP_CONCAT(prd.name, ' - ') AS products,
                ord.subtotal,
                ord.discount,
                ord.total,
                ord.payment,
                ord.id 
            FROM orders AS ord
            INNER JOIN orders_itens 
            ON ord.id = orders_itens.id_order
            INNER JOIN products AS prd
            ON prd.id = orders_itens.product_id
            GROUP BY ord.id;`
        )
        return totalSales
    }

    async getSalesForPaymentOrDiscount(paymentChosen: string, hasDiscount: boolean) {
        let query =
            `
            SELECT 
                ord.created_at AS date,
                GROUP_CONCAT(prd.name, ', ') AS products,
                ord.subtotal,
                ord.discount,
                ord.total,
                ord.payment,
                ord.id
            FROM orders AS ord
            INNER JOIN orders_itens 
                ON ord.id = orders_itens.id_order
            INNER JOIN products AS prd
                ON prd.id = orders_itens.product_id
            WHERE 1=1
            `
        const queryParams: any[] = []

        if (paymentChosen && paymentChosen !== 'Todos') {
            query += ` AND ord.payment = ?`
            queryParams.push(paymentChosen)
        }

        if (hasDiscount !== undefined) {
            query += ` AND ord.discount ${hasDiscount ? '>' : '='} 0`
        }

        query += `
            GROUP BY ord.id, ord.created_at, ord.subtotal, ord.discount, ord.total, ord.payment
        `
        return await this.orderRepository.query(query, queryParams)
    }
}