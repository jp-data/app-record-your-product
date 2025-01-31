import { api } from '../lib/axios'

export async function getBestProductsSelling({ period }: { period: string }) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get(`/orders/bestProducts?period=${period}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}