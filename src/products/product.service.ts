import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductListDto } from "./dtos/product-list-dto";

export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto)
        return this.productRepository.save(newProduct)
    }

    async listAll() {
        const productsToList = await this.productRepository.find({
            // relations: {
            //     image: true
            // }
        })
        const productsList = productsToList.map(
            (product) => 
                new ProductListDto(
                    product.id,
                    product.name,
                    product.image
                )
        )
        return productsList
    }
}