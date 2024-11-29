import { api } from "../lib/axios";

export async function getSalesData({ period }) {
    const response = await api.get(`/orders/salesQuantity?period=${period}`)
    return response.data
}