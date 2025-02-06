import { IsNotEmpty, IsNumber, IsString } from "class-validator"

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

   @IsNumber()
   @IsNotEmpty()
   quantity: number

   @IsNumber()
   @IsNotEmpty()
   price: number
}