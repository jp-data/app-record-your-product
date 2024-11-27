import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./order.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto)
    }

    @Get('/totalSales')
    getSales() {
        return this.ordersService.getSales()
    }

    @Get('/filter')
    async getSalesForPayment(
        @Query('paymentChosen') paymentChosen: string
    ) {
        return await this.ordersService.getSalesForPayment(paymentChosen)
    }
}