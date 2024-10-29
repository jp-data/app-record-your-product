import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UserListDto } from "./dtos/user-list-dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto)
        return this.userRepository.save(user)
    }

    async listUsers() {
        const usersFromDb = await this.userRepository.find()
        const usersList = usersFromDb.map(
            (user) => new UserListDto(
                user.id,
                user.name,
                user.email,
            )
        )
        return usersList
    }

    async updateUser() { }

    async deleteUser() { }
}