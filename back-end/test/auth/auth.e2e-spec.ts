import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import * as request from 'supertest'
import { AuthService } from '../../src/auth/auth.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { AppDataSource } from '../../src/database/ormconfig';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let controller: AuthController;
  let userRepository: Repository<UserEntity>
  let authToken: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.listen(3001)
    await app.init()

    await AppDataSource.initialize()
    await AppDataSource.synchronize(true)

    userRepository = moduleRef.get('UserEntityRepository')
  })

  it('should be able to create an user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user',
        email: 'test@email.com',
        password: '123456'
      })
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'test user',
        email: 'test@email.com',
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null,
      })
    )
  });

  it('should be able to refuse an new user register if email already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user',
        email: 'test@email.com',
        password: '123456'
      })
      .expect(409)

    expect(response.body).toEqual(
      expect.objectContaining({
        "message": "Email já cadastrado!",
        "error": "EmailAlreadyExistsException"
      })
    )
  })

  it('should be able to refuse an new user register if password doesn"t have at minimum 6 characters', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'test user',
        email: 'test2@email.com',
        password: '12345'
      })
      .expect(400)

    expect(response.body).toEqual(
      expect.objectContaining({
        "message": ["password must be longer than or equal to 6 characters"],
        "error": "Bad Request",
        "statusCode": 400
      })
    )
  })

  it('should be able to allow a registered user to log in', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@email.com',
        password: '123456'
      })
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        "access_token": expect.any(String)
      })
    )
  })

  it('should be able to refuse an log in if user email is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testFalseUser@email.com',
        password: 'testFalseUser'
      })
      .expect(409)

    expect(response.body).toEqual(
      expect.objectContaining({
        "message": "Invalid credentials",
        "error": "InvalidCredentials"
      })
    )
  })

  it('should be able to refuse an log in if user password is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@email.com',
        password: 'wrongPassword'
      })
      .expect(409)

    expect(response.body).toEqual(
      expect.objectContaining({
        "message": "Invalid credentials",
        "error": "InvalidCredentials"
      })
    )
  })
});
