import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/order.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';


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
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 3600 * 1000,
        })
      }),
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
