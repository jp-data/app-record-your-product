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

        await orderRepository.clear();
    })

    it('should be able to list all registered orders ordered by pix payment', async () => {
        await productRepository.save([
            {
                id: 1,
                name: 'Produto teste 1',
                description: 'teste 1 desc',
                category: 'teste 1 categ',
                price: 100,
                quantity: 100
            },
            {
                id: 2,
                name: 'Produto teste 2',
                description: 'teste 2 desc',
                category: 'teste 2 categ',
                price: 100,
                quantity: 100
            }
        ])
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'debito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }
        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto2)
            .expect(201)

        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=pix')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders ordered by debit payment', async () => {
        await productRepository.save([
            {
                id: 1,
                name: 'Produto teste 1',
                description: 'teste 1 desc',
                category: 'teste 1 categ',
                price: 100,
                quantity: 100
            },
            {
                id: 2,
                name: 'Produto teste 2',
                description: 'teste 2 desc',
                category: 'teste 2 categ',
                price: 100,
                quantity: 100
            }
        ])
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'debito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }

        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto2)
            .expect(201)

        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=debito')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'debito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders ordered by credit payment', async () => {
        await productRepository.save([
            {
                id: 1,
                name: 'Produto teste 1',
                description: 'teste 1 desc',
                category: 'teste 1 categ',
                price: 100,
                quantity: 100
            },
            {
                id: 2,
                name: 'Produto teste 2',
                description: 'teste 2 desc',
                category: 'teste 2 categ',
                price: 100,
                quantity: 100
            }
        ])
        const createOrderDto = {
            payment: 'credito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'debito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }

        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .send(createOrderDto2)
            .expect(201)

        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=credito')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'credito',
                    id: expect.any(Number)
                })
            ])
        )
    })
})