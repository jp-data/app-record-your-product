import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./order.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto)
    }
}