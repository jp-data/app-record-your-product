import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";


@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {
        console.log('UserService:', userService)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ) {
        return await this.userService.createUser(createUserDto)

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