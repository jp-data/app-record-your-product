import { Body, Controller, Get, Post, Query, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./order.service";
import { AuthGuard, RequestWithUser } from "src/auth/guard/guard";
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(
        @Body(ValidationPipe) createOrderDto: CreateOrderDto,
        @Req() req: RequestWithUser
    ) {
        const userId = req.user.sub
        return this.ordersService.create(createOrderDto, userId)
    }

    @Get('/totalSales')
    getSales(
        @Req() req: RequestWithUser
    ) {
        const userId = req.user.sub
        return this.ordersService.getSales(userId)
    }

    @Get('/filter')
    async getSalesForPayment(
        @Req() req: RequestWithUser,
        @Query('paymentChosen') paymentChosen?: string,
        @Query('hasDiscount') hasDiscount?: string,
        @Query('day') day?: string,
    ) {
        const userId = req.user.sub
        const hasDiscountBoolean = hasDiscount === 'true' ? true : hasDiscount === 'false' ? false : undefined
        return await this.ordersService.getSalesForPaymentOrDiscount(paymentChosen, hasDiscountBoolean, day, userId)
    }

    @Get('/salesQuantity')
    async getSalesQuantity(
        @Req() req: RequestWithUser,
        @Query('period') period?: string
    ) {
        const userId = req.user.sub
        return await this.ordersService.getSalesQuantity(userId, period)
    }

    @Get('/bestProducts')
    async getBestSellingProducts(
        @Req() req: RequestWithUser,
        @Query('period') period?: string
    ) {
        const userId = req.user.sub
        return await this.ordersService.getBestSellingProducts(userId, period)
    }

    @Get('/invoicingEvolution')
    async getInvoicingEvolution(
        @Req() req: RequestWithUser,
        @Query('period') period?: string
    ) {
        const userId = req.user.sub
        return await this.ordersService.getInvoicingEvolution(userId, period)
    }
}