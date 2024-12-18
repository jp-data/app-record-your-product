import { UpdateUserDto } from './dtos/update-user-dto';
import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UserListDto } from "./dtos/user-list-dto";
import { hashPassword } from './auth/hash';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const email = createUserDto.email
        const userExists = await this.userRepository.findOne({
            where: { email }
        })

        if (userExists) {
            throw new Error('This email already exists!')
        }

        const hash = await hashPassword(createUserDto.password)

        const user = this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hash
        })
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

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const userToUpdate = await this.userRepository.findOne({
            where: { id }
        })

        if (!userToUpdate) {
            throw new Error('User not found!')
        }
        return this.userRepository.update(id, updateUserDto)
    }

    async deleteUser(id: string) {
        const userToDelete = await this.userRepository.findOne({
            where: { id }
        })

        if (!userToDelete) {
            throw new Error('User not found!')
        }
        return this.userRepository.remove(userToDelete)
    }

    async findUser(email: string) {
        const userExists = await this.userRepository.findOneBy({ email })
        if (!userExists) {
            throw new Error('User not found!')
        }
        return userExists
    }
}