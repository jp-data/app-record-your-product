import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest'
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../../src/app.module";
import { OrderEntity } from "../../src/orders/entities/order.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "../../src/products/entities/product.entity";
import { arrayContains } from "class-validator";

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
            payment: 'débito',
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
            payment: 'débito',
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
            .get('/orders/filter?paymentChosen=débito')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'débito',
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
            payment: 'crédito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
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
            .get('/orders/filter?paymentChosen=crédito')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders that discount option was applied', async () => {
        const createOrderDto = {
            payment: 'débito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'pix',
            discount: 10,
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
            .get('/orders/filter?hasDiscount=true')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 10,
                    total: 390,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders that discount option was not applied', async () => {
        const createOrderDto = {
            payment: 'débito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'pix',
            discount: 10,
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
            .get('/orders/filter?hasDiscount=false')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders that payment chosen equals to debit and discount has been applied', async () => {
        const createOrderDto = {
            payment: 'débito',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
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
            .get('/orders/filter?paymentChosen=débito&hasDiscount=true')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 10,
                    total: 390,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to debit and doesn't have discount", async () => {
        const createOrderDto = {
            payment: 'débito',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
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
            .get('/orders/filter?paymentChosen=débito&hasDiscount=false')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2, Produto teste 1',
                    subtotal: 400,
                    discount: 0,
                    total: 400,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to credit and discount has been applied", async () => {
        const createOrderDto = {
            payment: 'crédito',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
            ]
        }
        const createOrderDto2 = {
            payment: 'crédito',
            discount: 0,
            items: [
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
            .get('/orders/filter?paymentChosen=crédito&hasDiscount=true')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1',
                    subtotal: 200,
                    discount: 10,
                    total: 190,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to credit and doesn't have discount", async () => {
        const createOrderDto = {
            payment: 'crédito',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
            ]
        }
        const createOrderDto2 = {
            payment: 'crédito',
            discount: 0,
            items: [
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
            .get('/orders/filter?paymentChosen=crédito&hasDiscount=false')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2',
                    subtotal: 200,
                    discount: 0,
                    total: 200,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to pix and discount has been applied", async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
            ]
        }
        const createOrderDto2 = {
            payment: 'pix',
            discount: 0,
            items: [
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
            .get('/orders/filter?paymentChosen=pix&hasDiscount=true')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1',
                    subtotal: 200,
                    discount: 10,
                    total: 190,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to pix and doesn't have discount", async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 10,
            items: [
                { product_id: 1, quantity: 2 },
            ]
        }
        const createOrderDto2 = {
            payment: 'pix',
            discount: 0,
            items: [
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
            .get('/orders/filter?paymentChosen=pix&hasDiscount=false')
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 2',
                    subtotal: 200,
                    discount: 0,
                    total: 200,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to return the total number of sales', async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 4 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
            discount: 0,
            items: [
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
            .get('/orders/salesQuantity')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    vendas: 2,
                    faturamento: 700
                })
            ])
        )
    })

    it('should be able to return an descending list of best-selling products', async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 4 },
                { product_id: 2, quantity: 6 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 5 },
                { product_id: 2, quantity: 5 }
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
            .get('/orders/bestProducts')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Produto: "Produto teste 2",
                    soma: 11,
                    DATA: expect.any(String)
                }),
                expect.objectContaining({
                    Produto: "Produto teste 1",
                    soma: 9,
                    DATA: expect.any(String)
                })
            ])
        )
    })

    it('should be able to return the total billing for the day', async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 2 },
                { product_id: 2, quantity: 2 }
            ]
        }
        const createOrderDto2 = {
            payment: 'débito',
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
            .get('/orders/invoicingEvolution')
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    dia: expect.any(String),
                    faturamento: 800
                }),

            ])
        )
    })
})