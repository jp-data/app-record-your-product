import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductService } from "./product.service";
import { ProductEntity } from "./entities/product.entity";
import { UpdateProductDto } from "./dtos/update.product-dto";
import { AuthGuard, RequestWithUser } from "src/auth/guard/guard";
import { UserEntity } from "src/users/entities/user.entity";
import { UserCacheInterceptor } from "src/auth/guard/user-cache-interceptor";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly productService: ProductService,

    ) { }

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
    @UseInterceptors(UserCacheInterceptor)
    async listProducts(
        @Req() req: RequestWithUser
    ) {
        const userId = req.user.sub
        const products = await this.productService.listAll(userId)
        return products
    }

    @Post()
    async createProduct(
        @Req() req: RequestWithUser,
        @Body(ValidationPipe) createProductDto: CreateProductDto
    ) {
        const dataProduct = new ProductEntity();

        dataProduct.name = createProductDto.name;
        dataProduct.description = createProductDto.description;
        dataProduct.category = createProductDto.category;
        dataProduct.quantity = createProductDto.quantity;
        dataProduct.price = createProductDto.price;
        dataProduct.image = createProductDto.image;
        dataProduct.user = { id: req.user.sub } as UserEntity;

        const newProduct = await this.productService.create(dataProduct);

        const cacheKey = `${req.user.sub}-${req.url}`;
        await this.cacheManager.del(cacheKey);

        return newProduct;
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

