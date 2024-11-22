import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    @IsInt()
    product_id: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    payment: string

    @IsNumber()
    discount: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}