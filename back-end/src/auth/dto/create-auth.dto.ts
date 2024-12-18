import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsEmail(undefined, { message: 'Invalid email' })
    email: string

    @IsNotEmpty({ message: 'Password should not be empty!' })
    password: string

}
