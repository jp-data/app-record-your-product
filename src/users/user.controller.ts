import { Body, Controller, Delete, Get, Post, Put, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dtos/create-user-dto";
import { randomUUID } from "crypto";


@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ) {
        const userEntity = new UserEntity()
        userEntity.id = randomUUID()
        userEntity.name = createUserDto.name
        userEntity.email = createUserDto.email
        userEntity.password = createUserDto.password

        const newUser = this.userService.createUser(userEntity)
        return newUser
    }

    @Get()
    async getUsers() { }

    @Put()
    async updateUser() { }

    @Delete()
    async deleteUser() { }
}