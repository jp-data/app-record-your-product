import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest'
import { AppModule } from "../../src/app.module";
import { OrderEntity } from "../../src/orders/entities/order.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "../../src/products/entities/product.entity";
import { AppDataSource } from "../../src/database/ormconfig";
import { OrderItemEntity } from "../../src/orders/entities/order-item.entity";
import { UserEntity } from "src/users/entities/user.entity";
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let orderRepository: Repository<OrderEntity>
    let productRepository: Repository<ProductEntity>
    let orderItemRepository: Repository<OrderItemEntity>
    let userRepository: Repository<UserEntity>
    let authToken: string

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication();
        await app.listen(3001)
        await app.init();

        await AppDataSource.initialize();
        await AppDataSource.synchronize(true)

        orderRepository = moduleRef.get('OrderEntityRepository')
        productRepository = moduleRef.get('ProductEntityRepository')
        orderItemRepository = moduleRef.get('OrderItemEntityRepository')
        userRepository = moduleRef.get('UserEntityRepository')

        await userRepository.save({
            name: 'user name',
            email: 'test@email.com',
            password: await bcrypt.hash('test123', 10)
        })

        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'test@email.com',
                password: 'test123'
            })

        authToken = responseLogin.body.access_token

        await request(app.getHttpServer())
            .post('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
                {
                    id: 1,
                    name: 'Produto teste 1',
                    description: 'teste 1 desc',
                    category: 'teste 1 categ',
                    price: 100,
                    quantity: 100
                },
            )

        await request(app.getHttpServer())
            .post('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                id: 2,
                name: 'Produto teste 2',
                description: 'teste 2 desc',
                category: 'teste 2 categ',
                price: 100,
                quantity: 100
            })

        const createOrderDtoPix =
        {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }

        const createOrderDtoPixWithDiscount =
        {
            payment: 'pix',
            discount: 30,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }

        const createOrderDtoDebit =
        {
            payment: 'débito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }

        const createOrderDtoDebitWithDiscount =
        {
            payment: 'débito',
            discount: 30,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }


        const createOrderDtoCredit =
        {
            payment: 'crédito',
            discount: 0,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }

        const createOrderDtoCreditWithDiscount =
        {
            payment: 'crédito',
            discount: 30,
            items: [
                { product_id: 1, quantity: 3 },
                { product_id: 2, quantity: 3 }
            ]
        }

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoPix)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoPixWithDiscount)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoDebit)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoDebitWithDiscount)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoCredit)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDtoCreditWithDiscount)
            .expect(201)
    })

    it('should be able to list all registered orders ordered by pix payment', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=pix')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders ordered by debit payment', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=débito')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)


        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders ordered by credit payment', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=crédito')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'crédito',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders that discount option was applied', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?hasDiscount=true')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'pix',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'débito',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'crédito',
                    id: expect.any(Number)
                }),

            ])
        )
    })

    it('should be able to list all registered orders that discount option was not applied', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?hasDiscount=false')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'pix',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'débito',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to list all registered orders that payment chosen equals to debit and discount has been applied', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=débito&hasDiscount=true')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to debit and doesn't have discount", async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=débito&hasDiscount=false')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to credit and discount has been applied", async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=crédito&hasDiscount=true')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to credit and doesn't have discount", async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=crédito&hasDiscount=false')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'crédito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to pix and discount has been applied", async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=pix&hasDiscount=true')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 30,
                    total: 570,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to list all registered orders that payment chosen equals to pix and doesn't have discount", async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/filter?paymentChosen=pix&hasDiscount=false')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 1, Produto teste 2',
                    subtotal: 600,
                    discount: 0,
                    total: 600,
                    payment: 'pix',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it('should be able to return the total number of sales', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/salesQuantity')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    vendas: "6",
                    faturamento: 3510
                })
            ])
        )
    })

    it('should be able to return an descending list of best-selling products', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/bestProducts')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    produto: "Produto teste 1",
                    soma: "18",
                    data: expect.any(String)
                }),
                expect.objectContaining({
                    produto: "Produto teste 2",
                    soma: "18",
                    data: expect.any(String)
                })
            ])
        )
    })

    it('should be able to return the total billing for the day', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders/invoicingEvolution')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    dia: expect.any(String),
                    faturamento: 3510
                }),

            ])
        )
    })
})