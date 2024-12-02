import { api } from '../lib/axios'

export async function getBestProductsSelling({ period }) {
    const response = await api.get(`/orders/bestProducts?period=${period}`)
    return response.data
}