import { api } from "../lib/axios";

interface userBody {
    name: string,
    email: string,
    password: string
}

export async function createUser({ name, email, password }: userBody) {
    await api.post('/users', { name, email, password })
}