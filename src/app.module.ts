import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './users/user.module';

@Module({
  imports: [ProductModule, UserModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule { }
