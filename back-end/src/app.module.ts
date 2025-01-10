import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/order.module';
import { AuthModule } from './auth/auth.module';


import * as dotenv from 'dotenv'


dotenv.config()
const isTestEnv = process.env.NODE_ENV === 'test'
@Module({
  imports: [
    ProductModule,
    UserModule,
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule
  ],
  controllers: [],
})
export class AppModule { }
