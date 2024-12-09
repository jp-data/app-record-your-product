import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductService } from "./product.service";
import { ProductEntity } from "./entities/product.entity";
import { randomUUID } from "crypto";
import { UpdateProductDto } from "./dtos/update.product-dto";


@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('/sort')
    async getSortedProducts(
        @Query('orderBy') orderBy: string,
        @Query('direction') direction: string
    ) {
        return await this.productService.getSortByProducts(orderBy, direction);
    }

    @Get('/:id')
    async findProduct(@Param('id') id: string) {
        return this.productService.findOne(Number(id))
    }

    @Get()
    async listProducts() {
        return this.productService.listAll()
    }

    @Post()
    async createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ) {
        const dataProduct = new ProductEntity()


        dataProduct.name = createProductDto.name
        dataProduct.description = createProductDto.description
        dataProduct.category = createProductDto.category
        dataProduct.quantity = createProductDto.quantity
        dataProduct.price = createProductDto.price
        dataProduct.image = createProductDto.image

        const newProduct = this.productService.create(dataProduct)
        return newProduct
    }

    @Put('/:id')
    async updateProduct(
        @Param('id') id: number,
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
    async deleteProduct(@Param('id') id: number) {
        await this.productService.delete(id)
    }

}

