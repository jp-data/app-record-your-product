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
        @InjectRepository(OrderEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity) private itemRepository: Repository<OrderItemEntity>
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const orderedItems = await Promise.all(
            createOrderDto.items.map(async (itemDto) => {
                const product = await this.productRepository.findOneBy({
                    id: itemDto.product_id
                })
                if (!product) {
                    throw new NotFoundException('Product not found!')
                }
                const allProducts = this.itemRepository.create({
                    product,
                    quantity: itemDto.quantity
                })
                return this.itemRepository.save(allProducts)
            })
        )

        const orderWithItems = this.orderRepository.create({
            items: orderedItems
        })
        return this.orderRepository.save(orderWithItems)
    }
}