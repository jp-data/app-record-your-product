import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {

   @IsString()
   @IsNotEmpty()
   name: string

   @IsString()
   @IsNotEmpty()
   description: string

   @IsString()
   @IsNotEmpty()
   category: string

   @IsOptional()
   @IsNumber()
   quantity?: number

   @IsNumber()
   @IsNotEmpty()
   price: number
}