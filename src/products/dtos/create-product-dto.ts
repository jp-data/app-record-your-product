import { IsArray, IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID, ValidateNested } from "class-validator"
import { Type } from 'class-transformer'
import { ProductEntity } from "../entities/product.entity"

export class ProductImageDto {
   id: string

   @IsUrl()
   url: string

   @IsString()
   description: string

   product: ProductEntity
}

export class CreateProductDto {
   @IsUUID()
   userID: string

   @IsString()
   @IsNotEmpty()
   name: string

   @IsString()
   @IsNotEmpty()
   description: string

   @IsString()
   @IsNotEmpty()
   category: string

   @IsNumber()
   @IsNotEmpty()
   quantity: number

   @IsNumber()
   @IsNotEmpty()
   price: number

   @ValidateNested()
   @IsArray()
   @Type(() => ProductImageDto)
   image: ProductImageDto[]
}