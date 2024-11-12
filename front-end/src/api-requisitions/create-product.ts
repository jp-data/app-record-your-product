import { api } from '../lib/axios'
interface productBody {
    name: string,
    description: string,
    category: string,
    quantity: number,
    price: number
}

export async function createProducts({ name, description, category, quantity, price }: productBody) {
    await api.post('/products', { name, description, category, quantity, price })
}