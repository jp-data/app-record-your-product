import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './users/user.module';
import { OrdersModule } from './orders/order.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(config),
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
