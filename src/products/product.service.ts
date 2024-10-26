import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product-dto";

export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto)
        return this.productRepository.save(newProduct)
    }
}