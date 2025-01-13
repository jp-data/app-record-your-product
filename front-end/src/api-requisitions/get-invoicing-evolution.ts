import { api } from '../lib/axios'

export async function getInvoicingEvolution({ period }) {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get(`/orders/invoicingEvolution?period=${period}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}