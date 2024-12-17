import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/order.module';
import { CacheModule } from '@nestjs/cache-manager';


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
    CacheModule.register({
      isGlobal: true,
      ttl: 10
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
