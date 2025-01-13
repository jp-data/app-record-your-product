import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product-dto";
import { ProductListDto } from "./dtos/product-list-dto";
import { UpdateProductDto } from "./dtos/update.product-dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/users/entities/user.entity";



@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }


    async create(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto)
        return this.productRepository.save(newProduct)
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({
            where: { id }
        })
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        return product
    }

    async listAll(userId: string) {
        const productsToList = await this.productRepository.find({
            where: {
                user: { id: userId },
            },
            relations: {
                user: true,
            }
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


    async getSortByProducts(userId: string, orderBy: string, direction: string) {
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
        WHERE products."userId" = '${userId}'
        ORDER BY ${orderBy} ${direction}

    `)
        return products
    }

    async update(id: number, updateProductDto: UpdateProductDto, userId: string) {
        const productToUpdate = await this.productRepository.findOne({
            where: { id },
            relations: ['user']
        })

        if (!productToUpdate || productToUpdate.user.id != userId) {
            throw new NotFoundException('Product not found!')
        }

        return this.productRepository.update(id, updateProductDto)
    }

    async delete(id: number, userId: string) {
        const productToDelete = await this.productRepository.findOne({
            where: { id },
            relations: ['user']
        })

        if (!productToDelete || productToDelete.user.id != userId) {
            throw new NotFoundException('Product not found!')
        }

        return this.productRepository.remove(productToDelete)
    }
}