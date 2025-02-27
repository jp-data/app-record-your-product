import { api } from "../lib/axios";

export async function getSalesData({ period }: { period: string }) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get(`/orders/salesQuantity?period=${period}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return response.data
}