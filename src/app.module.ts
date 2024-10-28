import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule { }
