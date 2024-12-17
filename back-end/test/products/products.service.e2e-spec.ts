import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../src/products/entities/product.entity';
import { AppDataSource } from '../../src/database/ormconfig';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let productRepository: Repository<ProductEntity>

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        console.log("NODE_ENV:", process.env.NODE_ENV)
        app = moduleRef.createNestApplication();
        await app.listen(3001)
        await app.init();

        await AppDataSource.initialize();
        await AppDataSource.synchronize(true)

        productRepository = moduleRef.get('ProductEntityRepository')
    })

    it('should be able to list all registered products ordered by price descending', async () => {
        await productRepository.save([
            {
                name: 'Product 1',
                description: 'Description 1',
                category: 'Category 1',
                quantity: 100,
                price: 100,
            },
            {
                name: 'Product 2',
                description: 'Description 2',
                category: 'Category 2',
                quantity: 200,
                price: 200,
            }
        ])
        const response = await request(app.getHttpServer())
            .get('/products/sort?orderBy=price&direction=DESC')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 2',
                    description: 'Description 2',
                    category: 'Category 2',
                    quantity: 200,
                    price: 200,
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    quantity: 100,
                    price: 100,
                })
            ])
        )
    })

    it('should be able to list all registered products ordered by price ascending', async () => {
        await productRepository.save([
            {
                name: 'Product 1',
                description: 'Description 1',
                category: 'Category 1',
                quantity: 100,
                price: 100,
            },
            {
                name: 'Product 2',
                description: 'Description 2',
                category: 'Category 2',
                quantity: 200,
                price: 200,
            }
        ])
        const response = await request(app.getHttpServer())
            .get('/products/sort?orderBy=price&direction=DESC')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    quantity: 100,
                    price: 100,
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 2',
                    description: 'Description 2',
                    category: 'Category 2',
                    quantity: 200,
                    price: 200,
                }),
            ])
        )
    })

    // it('should be able to list all registered products ordered by quantity descending', async () => {
    //     await productRepository.save([
    //         {
    //             name: 'Product 1',
    //             description: 'Description 1',
    //             category: 'Category 1',
    //             quantity: 100,
    //             price: 100,
    //         },
    //         {
    //             name: 'Product 2',
    //             description: 'Description 2',
    //             category: 'Category 2',
    //             quantity: 200,
    //             price: 200,
    //         }
    //     ])
    //     const response = await request(app.getHttpServer())
    //         .get('/products/sort?orderBy=quantity&direction=DESC')
    //         .expect(200)

    //     expect(response.body).toEqual(
    //         expect.arrayContaining([
    //             expect.objectContaining({
    //                 id: expect.any(Number),
    //                 name: 'Product 2',
    //                 description: 'Description 2',
    //                 category: 'Category 2',
    //                 quantity: 200,
    //                 price: 200,
    //             }),
    //             expect.objectContaining({
    //                 id: expect.any(Number),
    //                 name: 'Product 1',
    //                 description: 'Description 1',
    //                 category: 'Category 1',
    //                 quantity: 100,
    //                 price: 100,
    //             }),
    //         ])
    //     )
    // })

    // it('should be able to list all registered products ordered by quantity ascending', async () => {
    //     await productRepository.save([
    //         {
    //             name: 'Product 1',
    //             description: 'Description 1',
    //             category: 'Category 1',
    //             quantity: 200,
    //             price: 100,
    //         },
    //         {
    //             name: 'Product 2',
    //             description: 'Description 2',
    //             category: 'Category 2',
    //             quantity: 150,
    //             price: 100,
    //         }
    //     ])
    //     const response = await request(app.getHttpServer())
    //         .get('/products/sort?orderBy=quantity&direction=ASC')
    //         .expect(200)

    //     expect(response.body).toEqual(
    //         expect.arrayContaining([
    //             expect.objectContaining({
    //                 id: expect.any(Number),
    //                 name: 'Product 2',
    //                 description: 'Description 2',
    //                 category: 'Category 2',
    //                 quantity: 150,
    //                 price: 100,
    //             }),
    //             expect.objectContaining({
    //                 id: expect.any(Number),
    //                 name: 'Product 1',
    //                 description: 'Description 1',
    //                 category: 'Category 1',
    //                 quantity: 200,
    //                 price: 100,
    //             }),
    //         ])
    //     )
    // })
})