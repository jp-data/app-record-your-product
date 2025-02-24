import { api } from '../lib/axios'

interface productBody {
    name?: string,
    description?: string,
    category?: string,
    quantity?: number,
    price?: number
}

export async function updateProducts(id: string, data: productBody) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    await api.put(`/products/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}