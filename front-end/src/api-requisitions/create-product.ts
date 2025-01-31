import { api } from '../lib/axios'
import { TableProductsDataType } from '../pages/app/products/table-products'

export async function createProducts({ name, description, category, quantity, price }: TableProductsDataType) {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error("Usuário não autenticado")
    }
    await api.post('/products', { name, description, category, quantity, price }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}