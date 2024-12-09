import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { EnumPayment } from "./enums/enum-payment";

export class OrderItemDto {
    @IsNotEmpty()
    @IsInt()
    product_id: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;
}

export class CreateOrderDto {
    @Transform(({ value }) => value.toUpperCase())
    @IsNotEmpty()
    @IsEnum(EnumPayment, { message: 'Pagamentos autorizados: PIX, DÉBITO ou CRÉDITO' })
    payment: EnumPayment

    @IsNumber()
    discount: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}