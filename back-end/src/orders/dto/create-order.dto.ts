import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    @IsInt()
    product_id: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}