import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}