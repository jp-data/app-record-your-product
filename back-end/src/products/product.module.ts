import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { UserService } from "../users/user.service";
import { UserEntity } from "../users/entities/user.entity";


@Module({
   imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
   controllers: [ProductController],
   providers: [ProductService, UserService]
})

export class ProductModule { }