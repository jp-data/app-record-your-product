import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../src/products/entities/product.entity';
import { AppDataSource } from '../../src/database/ormconfig';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let productRepository: Repository<ProductEntity>
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

    productRepository = moduleRef.get('ProductEntityRepository')
    userRepository = moduleRef.get('UserEntityRepository')

    await userRepository.save({
      name: 'test user',
      email: 'test@email.com',
      password: await bcrypt.hash('test123', 10)
    })

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@email.com',
        password: 'test123'
      })

    authToken = loginResponse.body.access_token
  })

  it('should be able to list all registered products', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        quantity: 10,
        price: 100,
      })
      .expect(201)

    await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Product 2',
        description: 'Description 2',
        category: 'Category 2',
        quantity: 10,
        price: 100,
      })
      .expect(201)

    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          quantity: 10,
          price: 100,
        }),
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Product 2',
          description: 'Description 2',
          category: 'Category 2',
          quantity: 10,
          price: 100,
        }),
      ])
    )
  })

  it('should be able to create an new product', async () => {
    const createProductDto = {
      name: 'Teste 2',
      description: 'Teste 2 description',
      category: 'Teste 2 category',
      quantity: 100,
      price: 50
    }
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createProductDto)
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Teste 2',
        description: 'Teste 2 description',
        category: 'Teste 2 category',
        quantity: 100,
        price: 50
      })
    )
  })

  it('should be able to edit an registered product', async () => {
    const createProductDto = {
      name: 'Teste 0412 for update',
      description: 'Teste 0412 description',
      category: 'Teste 0412 category',
      quantity: 10,
      price: 5
    }

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createProductDto)
      .expect(201)

    const productId = response.body.id

    const updatedProduct = {
      name: 'Teste 0412 updated',
      description: 'Teste 0412 description',
      category: 'Teste 0412 category',
      quantity: 150,
      price: 55
    }

    const expectedResponse = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedProduct)
      .expect(200)

    expect(expectedResponse.body).toEqual(
      expect.objectContaining({
        message: 'Produto alterado com sucesso!',
        newProduct: expect.objectContaining({
          affected: 1
        })
      })
    )

    const newProduct = await productRepository.findOneBy({ id: productId })
    expect(newProduct).toEqual(
      expect.objectContaining({
        name: 'Teste 0412 updated',
        quantity: 150,
        price: 55
      })
    )
  })

  it("should be able to refuse an update if product id doesn't exists", async () => {
    const updatedData = {
      name: 'Non-existent product',
      price: 1,
      quantity: 1
    }
    const response = await request(app.getHttpServer())
      .put('/products/999')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData)
      .expect(404)

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Product not found!',
      error: 'Not Found'
    })
  })

  it("should be able to delete an product", async () => {
    const productToDeleteDto = {
      name: 'Teste produto delecao',
      description: 'Teste produto descricao',
      category: 'Teste produto categoria',
      quantity: 100,
      price: 100
    }

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(productToDeleteDto)
      .expect(201)

    const productId = response.body.id

    await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)

    const productDeleted = await productRepository.findOneBy({ id: productId })
    expect(productDeleted).toBeNull()
  })

  it("should be able to refuse an deletion if product id doesn't exists", async () => {
    const response = await request(app.getHttpServer())
      .delete('/products/84654654')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404)

    expect(response.body).toEqual({
      statusCode: 404,
      message: "Product not found!",
      error: "Not Found",
    })
  })

})
