import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ProductEntity } from "../products/entities/product.entity";
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
            items: orderedItems,
        })

        return await this.orderRepository.save(orderWithItems)
    }

    async getSales() {
        const totalSales = await this.orderRepository.query(
            `SELECT 
                ord.created_at AS date,
                STRING_AGG(prd.name, ' - ') AS products,
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
            GROUP BY ord.id, date;`
        )
        return totalSales
    }

    async getSalesForPaymentOrDiscount(paymentChosen: string, hasDiscount: boolean, day: string) {
        let query =
            `
            SELECT 
                ord.created_at AS date,
                STRING_AGG(prd.name, ', ') AS products,
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
            query += ` AND ord.payment = $1`
            queryParams.push(paymentChosen)
        }

        if (hasDiscount !== undefined) {
            query += ` AND ord.discount ${hasDiscount ? '>' : '='} 0`
        }

        if (day) {
            query += ` AND ord.created_at >= CURRENT_DATE - INTERVAL '${day} days'`
        }

        if (day === '1') {
            query += ` AND ord.created_at >= CURRENT_DATE - INTERVAL '${day} days'
                        AND ord.created_at < CURRENT_DATE - INTERVAL 'now'`
        }

        query += `
            GROUP BY ord.id, ord.subtotal, ord.discount, ord.total, ord.payment
        `
        return await this.orderRepository.query(query, queryParams)
    }

    async getSalesQuantity(period: string) {
        let query = `
            SELECT COUNT(ord.id) AS vendas,
            SUM(ord.total) AS faturamento
            FROM orders AS ord
            WHERE 1=1
        `
        if (period) {
            query += ` AND ord.created_at >= CURRENT_DATE - INTERVAL '${period} days'`
        }

        return await this.orderRepository.query(query)
    }


    async getBestSellingProducts(period: string) {
        let query = `
           SELECT 
                prd.name AS Produto, 
                SUM(ord_itens.quantity) AS soma, 
                ord.created_at AS DATA
            FROM 
                products AS prd
            INNER JOIN 
                orders_itens AS ord_itens
            ON 
                prd.id = ord_itens.product_id 
            INNER JOIN 
                orders AS ord
            ON 
                ord_itens.id_order = ord.id 
            WHERE 
                1=1
            `
        if (period) {
            query += ` AND ord.created_at >= CURRENT_DATE - INTERVAL '${period} days'`
        }

        query += ` GROUP BY prd.name, ord.created_at ORDER BY soma DESC LIMIT 5`

        return await this.orderRepository.query(query)
    }

    async getInvoicingEvolution(period: string) {
        let query = `
            SELECT 
                DATE(ord.created_at) AS dia,
                SUM(ord.total) AS faturamento
                FROM orders AS ord
                WHERE 1=1
        `
        if (period) {
            query += ` AND ord.created_at >= CURRENT_DATE - INTERVAL '${period} days'`
        }
        query += `GROUP BY dia ORDER BY dia`

        return await this.orderRepository.query(query)
    }
}