import { api } from "../lib/axios"

export async function getSalesByPaymentChosen({ paymentChosen }) {
    const response = await api.get(`orders/filter?paymentChosen=${paymentChosen}`)

    return response.data
}