import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/order.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';


import * as dotenv from 'dotenv'
import { UserCacheInterceptor } from './auth/guard/user-cache-interceptor';

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
    !isTestEnv ?
      CacheModule.registerAsync({
        useFactory: async () => ({
          store: await redisStore({
            ttl: 3600 * 1000,
          })
        }),
        isGlobal: true,
      }) : CacheModule.register(),
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserCacheInterceptor,
    }
  ],
})
export class AppModule { }
