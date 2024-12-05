import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest'
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../../src/app.module";
import { OrderEntity } from "../../src/orders/entities/order.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "../../src/products/entities/product.entity";

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let orderRepository: Repository<OrderEntity>
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

        orderRepository = moduleFixture.get('OrderEntityRepository')
        productRepository = moduleFixture.get('ProductEntityRepository')
    })

    it('should be able to create an order', async () => {
        await productRepository.save([
            {
                id: 123456,
                name: 'Produto teste 123456',
                description: 'teste 123456 desc',
                category: 'teste 123456 categ',
                price: 100,
                quantity: 100
            }
        ])

        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 123456, quantity: 2 },
            ]
        }

        const response = await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto)
            .expect(201)

        expect(response.body).toEqual(
            expect.objectContaining({
                subtotal: 200,
                discount: 0,
                total: 200,
                payment: 'pix',
                id: expect.any(Number),
                createdAt: expect.any(String),
                items: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        quantity: 2,
                        product: expect.objectContaining({
                            id: 123456,
                            name: 'Produto teste 123456',
                            description: 'teste 123456 desc',
                            category: 'teste 123456 categ',
                            price: 100,
                            quantity: 100,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            deletedAt: null
                        })
                    })
                ])
            })
        )
    })

    it('should be able to list all registered orders', async () => {

    })
})