import 'reflect-metadata'
import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/order.module';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv'
import { SharedModule } from './auth/utils/shared.module';

dotenv.config()

@Module({
  imports: [
    ProductModule,
    UserModule,
    OrdersModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [],
})
export class AppModule { }
