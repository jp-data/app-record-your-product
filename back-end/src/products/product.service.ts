import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductListDto } from "./dtos/product-list-dto";
import { UpdateProductDto } from "./dtos/update.product-dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async findOne(id: string) {
        return await this.productRepository.findOne({
            where: { id }
        })
    }

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
                )
        )
        return productsList
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const productToUpdate = await this.findOne(id)

        if (!productToUpdate) {
            throw new Error('Product not found!')
        }

        return this.productRepository.update(id, updateProductDto)
    }

    async delete(id: string) {
        const productToDelete = await this.productRepository.findOne({
            where: { id }
        })

        if (!productToDelete) {
            throw new Error('Product not found!')
        }

        return this.productRepository.remove(productToDelete)
    }


}