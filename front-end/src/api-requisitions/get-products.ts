import { api } from '../lib/axios'

export async function getProducts() {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get('/products', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}