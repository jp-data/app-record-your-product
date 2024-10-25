import { Controller, ValidationPipe } from "@nestjs/common";

@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(Body(ValidationPipe) createProductDto: CreateProductDto) {

}
}

