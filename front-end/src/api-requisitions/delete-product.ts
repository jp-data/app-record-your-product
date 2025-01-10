import { api } from "../lib/axios";

export async function deleteProduct(id: string) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    await api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}