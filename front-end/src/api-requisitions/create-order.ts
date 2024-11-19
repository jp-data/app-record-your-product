import { api } from '../lib/axios'
import { RegisterOrderForm } from '../pages/app/sales/cart-new-sale'



export async function createOrders(orderData: RegisterOrderForm) {
    const response = await api.post('/orders', orderData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
}