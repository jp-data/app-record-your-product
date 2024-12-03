import { api } from '../lib/axios'

export async function getInvoicingEvolution({ period }) {
    const response = await api.get(`/orders/invoicingEvolution?period=${period}`)
    return response.data
}