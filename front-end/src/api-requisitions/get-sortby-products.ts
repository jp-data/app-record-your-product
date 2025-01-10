import { api } from '../lib/axios'

export async function getSortProducts({ orderBy, direction }) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    const response = await api.get(`products/sort?orderBy=${orderBy}&direction=${direction}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}