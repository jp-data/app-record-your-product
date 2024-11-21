import { api } from '../lib/axios'

export async function getTotalSales() {
    const response = await api.get('/orders/totalSales')

    return response.data
}