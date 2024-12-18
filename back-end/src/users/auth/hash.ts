import * as bcrypt from 'bcrypt'

let saltOrRounds: number = 6

export async function hashPassword(password: string) {
    return bcrypt.hash(password, saltOrRounds)
}