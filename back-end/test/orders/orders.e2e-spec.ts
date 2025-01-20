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

    })

    beforeEach(async () => {
        await userRepository.save({
            name: 'user test',
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
    });

    it('should be able to create an order', async () => {
        const responseProduct = await request(app.getHttpServer())
            .post('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Produto teste 123456',
                description: 'teste 123456 desc',
                category: 'teste 123456 categ',
                price: 100,
                quantity: 100
            })

        const productId = responseProduct.body.id

        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: productId, quantity: 2 },
            ]
        }


        const response = await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
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
                            id: productId,
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

        const responseProduct = await request(app.getHttpServer())
            .post('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Produto teste 500',
                description: 'teste 500 desc',
                category: 'teste 500 categ',
                price: 100,
                quantity: 100
            })

        const productId = responseProduct.body.id

        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: productId, quantity: 1 },
            ]
        }

        const createOrderDto2 = {
            payment: 'débito',
            discount: 0,
            items: [
                { product_id: productId, quantity: 1 },
            ]
        }

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDto)
            .expect(201)

        await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDto2)
            .expect(201)

        const response = await request(app.getHttpServer())
            .get('/orders/totalSales')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 500',
                    subtotal: 100,
                    discount: 0,
                    total: 100,
                    payment: 'pix',
                    id: expect.any(Number)
                }),
                expect.objectContaining({
                    date: expect.any(String),
                    products: 'Produto teste 500',
                    subtotal: 100,
                    discount: 0,
                    total: 100,
                    payment: 'débito',
                    id: expect.any(Number)
                })
            ])
        )
    })

    it("should be able to refuse an sale order requisition if product doesn't exists", async () => {
        const createOrderDto = {
            payment: 'pix',
            discount: 0,
            items: [
                { product_id: 500, quantity: 10 }
            ]
        }
        const response = await request(app.getHttpServer())
            .post('/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .send(createOrderDto)
            .expect(404)

        expect(response.body).toEqual({
            statusCode: 404,
            message: 'Product with ID 500 not found',
            error: 'Not Found'
        })
    })
})