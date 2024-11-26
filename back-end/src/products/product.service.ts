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

    async create(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto)
        return this.productRepository.save(newProduct)
    }

    async findOne(id: number) {
        return await this.productRepository.findOne({
            where: { id }
        })
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
                    product.description,
                    product.category,
                    product.quantity,
                    product.price
                )
        )
        return productsList
    }


    async getSortByProducts(orderBy: string, direction: string) {
        const allowedColumns = ['price', 'quantity']
        if (!allowedColumns.includes(orderBy)) {
            throw new Error('Invalid column for ordering');
        }

        const allowedDirections = ['ASC', 'DESC'];
        if (!allowedDirections.includes(direction)) {
            throw new Error('Invalid direction');
        }

        const products = await this.productRepository.query(`
        SELECT * FROM products
        ORDER BY ${orderBy} ${direction}

    `)
        return products
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const productToUpdate = await this.findOne(id)

        if (!productToUpdate) {
            throw new Error('Product not found!')
        }

        return this.productRepository.update(id, updateProductDto)
    }

    async delete(id: number) {
        const productToDelete = await this.findOne(id)

        if (!productToDelete) {
            throw new Error('Product not found!')
        }

        return this.productRepository.remove(productToDelete)
    }

}