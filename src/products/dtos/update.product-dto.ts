import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { ProductImageDto } from "./create-product-dto";

export class UpdateProductDto {
   @IsUUID()
   userID: string

   @IsString()
   @IsNotEmpty()
   @IsOptional()
   name: string

   @IsString()
   @IsNotEmpty()
   @IsOptional()
   description: string

   @IsString()
   @IsNotEmpty()
   @IsOptional()
   category: string

   @IsNumber()
   @IsNotEmpty()
   @IsOptional()
   quantity: number

   @IsNumber()
   @IsNotEmpty()
   @IsOptional()
   price: number

   @ValidateNested()
   @Type(() => ProductImageDto)
   @IsOptional()
   image: ProductImageDto
}