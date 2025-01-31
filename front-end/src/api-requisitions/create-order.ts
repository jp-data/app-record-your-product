import { api } from '../lib/axios'
import { RegisterOrderForm } from '../pages/app/sales/cart-new-sale'

export async function createOrders(orderData: RegisterOrderForm) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.post('/orders', orderData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}