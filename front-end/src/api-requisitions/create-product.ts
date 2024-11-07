import { api } from '../lib/axios'
import { newProduct } from '../pages/app/products/form-new-product'

export async function createProducts(data: newProduct) {
    await api.post('/products', data)
}