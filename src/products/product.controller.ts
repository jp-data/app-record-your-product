import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductService } from "./product.service";
import { ProductEntity } from "./entities/product.entity";
import { randomUUID } from "crypto";


@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
        const dataProduct = new ProductEntity()

        dataProduct.id = randomUUID()
        dataProduct.name = createProductDto.name
        dataProduct.userID = createProductDto.userID
        dataProduct.description = createProductDto.description
        dataProduct.category = createProductDto.category
        dataProduct.quantity = createProductDto.quantity
        dataProduct.price = createProductDto.price
        
        const newProduct = this.productService.create(dataProduct)
        return newProduct
    }
}

