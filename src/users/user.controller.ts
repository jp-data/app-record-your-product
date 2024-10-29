import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller('/users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser() { }

    @Get()
    async getUsers() { }

    @Put()
    async updateUser() { }

    @Delete()
    async deleteUser() { }
}