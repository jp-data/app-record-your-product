import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "src/auth/utils/shared.module";



@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        SharedModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { }