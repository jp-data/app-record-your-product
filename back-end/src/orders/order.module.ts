import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderItemEntity } from "./entities/order-item.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { OrdersController } from "./order.controller";
import { OrdersService } from "./order.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ProductEntity])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule { }