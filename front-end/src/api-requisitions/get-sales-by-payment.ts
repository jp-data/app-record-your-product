import { api } from "../lib/axios"

export async function getSalesByPaymentChosenOrDiscount({ paymentChosen, hasDiscount }) {
    const response = await api.get(`orders/filter?paymentChosen=${paymentChosen}&hasDiscount=${hasDiscount}`)

    return response.data
}