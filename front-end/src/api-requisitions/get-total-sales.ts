import { api } from '../lib/axios'

export async function getTotalSales() {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get('/orders/totalSales', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}