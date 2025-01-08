import { api } from '../lib/axios'
interface productBody {
    name: string,
    description: string,
    category: string,
    quantity: number,
    price: number
}



export async function createProducts({ name, description, category, quantity, price }: productBody) {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    await api.post('/products', { name, description, category, quantity, price }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}