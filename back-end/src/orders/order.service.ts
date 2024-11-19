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
        let totalPrice = 0;

        const orderedItems = await Promise.all(
            createOrderDto.items.map(async (itemDto) => {
                const product = await this.productRepository.findOneBy({
                    id: itemDto.product_id
                })
                if (!product) {
                    throw new NotFoundException(`Product with ID ${itemDto.product_id} not found`)
                }
                totalPrice += product.price * itemDto.quantity

                const allProducts = this.itemRepository.create({
                    product,
                    quantity: itemDto.quantity
                })
                return this.itemRepository.save(allProducts)
            })
        )

        const orderWithItems = this.orderRepository.create({
            total: totalPrice,
            payment: createOrderDto.payment,
            items: orderedItems
        })
        return this.orderRepository.save(orderWithItems)
    }
}