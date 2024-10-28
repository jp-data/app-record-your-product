import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductService } from "./product.service";
import { ProductEntity } from "./entities/product.entity";
import { randomUUID } from "crypto";
import { UpdateProductDto } from "./dtos/update.product-dto";


@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ) {
        const dataProduct = new ProductEntity()

        dataProduct.id = randomUUID()
        dataProduct.name = createProductDto.name
        dataProduct.userID = createProductDto.userID
        dataProduct.description = createProductDto.description
        dataProduct.category = createProductDto.category
        dataProduct.quantity = createProductDto.quantity
        dataProduct.price = createProductDto.price
        dataProduct.image = createProductDto.image

        const newProduct = this.productService.create(dataProduct)
        return newProduct
    }

    @Get()
    async listProducts() {
        return this.productService.listAll()
    }

    @Put('/:id')
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        const productUpdated = await this.productService.update(
            id,
            updateProductDto
        )

        return {
            message: 'Produto alterado com sucesso!',
            newProduct: productUpdated
        }
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string) {
        await this.productService.delete(id)
    }
}

