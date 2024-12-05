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

  it('should be able to list all registered products', async () => {
    await productRepository.save([
      {
        name: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        quantity: 10,
        price: 100,
      },
      {
        name: 'Product 2',
        description: 'Description 2',
        category: 'Category 2',
        quantity: 20,
        price: 200,
      }
    ])

    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200)

    expect(Array.isArray(response.body)).toBe(true)
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
          quantity: 20,
          price: 200,
        })
      ])
    )
  });

  it('should be able to create an new product', async () => {
    const createProductDto = {
      name: 'Teste 1',
      description: 'Teste 1 description',
      category: 'Teste 1 category',
      quantity: 100,
      price: 50
    }
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        category: expect.any(String),
        quantity: expect.any(Number),
        price: expect.any(Number)
      })
    )
  })

  it('should be able to edit an registered product', async () => {
    const product = await productRepository.save({
      name: 'Teste 0412 for update',
      description: 'Teste 0412 description',
      category: 'Teste 0412 category',
      quantity: 10,
      price: 5
    })

    const updatedProduct = {
      name: 'Teste 0412 updated',
      description: 'Teste 0412 description',
      category: 'Teste 0412 category',
      quantity: 150,
      price: 55
    }

    const expectedResponse = await request(app.getHttpServer())
      .put(`/products/${product.id}`)
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

    const newProduct = await productRepository.findOneBy({ id: product.id })
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
      .send(updatedData)
      .expect(404)

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Product not found!',
      error: 'Not Found'
    })
  })

  it("should be able to delete an product", async () => {
    const productToDelete = await productRepository.save({
      name: 'Teste produto delecao',
      description: 'Teste produto descricao',
      category: 'Teste produto categoria',
      quantity: 100,
      price: 100
    })
    await request(app.getHttpServer())
      .delete(`/products/${productToDelete.id}`)
      .expect(200)

    const productDeleted = await productRepository.findOneBy({ id: productToDelete.id })
    expect(productDeleted).toBeNull()
  })

  it("should be able to refuse an deletion if product id doesn't exists", async () => {
    const response = await request(app.getHttpServer())
      .delete('/products/84654654')
      .expect(404)

    expect(response.body).toEqual({
      statusCode: 404,
      message: "Product not found!",
      error: "Not Found",
    })
  })
});
