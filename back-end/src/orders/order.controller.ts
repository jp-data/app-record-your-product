import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./order.service";
import { AuthGuard } from "src/auth/guard/guard";
@UseGuards(AuthGuard)
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
        @Query('paymentChosen') paymentChosen?: string,
        @Query('hasDiscount') hasDiscount?: string,
        @Query('day') day?: string
    ) {
        const hasDiscountBoolean = hasDiscount === 'true' ? true : hasDiscount === 'false' ? false : undefined
        return await this.ordersService.getSalesForPaymentOrDiscount(paymentChosen, hasDiscountBoolean, day)
    }

    @Get('/salesQuantity')
    async getSalesQuantity(
        @Query('period') period?: string
    ) {
        return await this.ordersService.getSalesQuantity(period)
    }

    @Get('/bestProducts')
    async getBestSellingProducts(
        @Query('period') period?: string
    ) {
        return await this.ordersService.getBestSellingProducts(period)
    }

    @Get('/invoicingEvolution')
    async getInvoicingEvolution(
        @Query('period') period?: string
    ) {
        return await this.ordersService.getInvoicingEvolution(period)
    }
}