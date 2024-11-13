import { api } from '../lib/axios'

interface productBody {
    name: string,
    description: string,
    category: string,
    quantity: number,
    price: number
}

export async function updateProducts(id: string, data: productBody) {
    await api.put(`/products/${id}`, data)
}