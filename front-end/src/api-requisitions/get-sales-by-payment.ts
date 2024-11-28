import { api } from "../lib/axios"

export async function getSalesByPaymentChosenOrDiscount({ paymentChosen, hasDiscount, day }) {
    const response = await api.get(`orders/filter?paymentChosen=${paymentChosen}&hasDiscount=${hasDiscount}&day=${day}`)

    return response.data
}