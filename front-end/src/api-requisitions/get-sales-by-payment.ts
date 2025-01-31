import { api } from "../lib/axios"

export async function getSalesByPaymentChosenOrDiscount(
    {
        paymentChosen,
        hasDiscount,
        day
    }:
        {
            paymentChosen: string, hasDiscount: string, day: string
        }
) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get(`orders/filter?paymentChosen=${paymentChosen}&hasDiscount=${hasDiscount}&day=${day}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}