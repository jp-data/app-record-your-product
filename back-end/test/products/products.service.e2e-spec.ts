import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../src/products/entities/product.entity';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let productRepository: Repository<ProductEntity>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [__dirname + '/../**/*.entity.{js,ts}'],
                    synchronize: true,
                })
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        productRepository = moduleFixture.get('ProductEntityRepository')
    });

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

    it('should be able to list all registered products ordered by quantity descending', async () => {
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
            .get('/products/sort?orderBy=quantity&direction=DESC')
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
                }),
            ])
        )
    })

    it('should be able to list all registered products ordered by quantity ascending', async () => {
        await productRepository.save([
            {
                name: 'Product 1',
                description: 'Description 1',
                category: 'Category 1',
                quantity: 200,
                price: 100,
            },
            {
                name: 'Product 2',
                description: 'Description 2',
                category: 'Category 2',
                quantity: 150,
                price: 100,
            }
        ])
        const response = await request(app.getHttpServer())
            .get('/products/sort?orderBy=quantity&direction=ASC')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 2',
                    description: 'Description 2',
                    category: 'Category 2',
                    quantity: 150,
                    price: 100,
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Product 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    quantity: 200,
                    price: 100,
                }),
            ])
        )
    })
})