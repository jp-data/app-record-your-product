import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dtos/create-user-dto";
import { randomUUID } from "crypto";
import { UpdateUserDto } from "./dtos/update-user-dto";


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
    async getUsers() {
        return this.userService.listUsers()
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto
    ) {
        const userUpdated = await this.userService.updateUser(
            id,
            updateUserDto
        )
        return {
            message: 'Usuário alterado com sucesso!',
            newUser: userUpdated
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id)
    }
}