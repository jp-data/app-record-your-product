import { api } from '../lib/axios'

export async function getSortProducts({ orderBy, direction }) {
    const response = await api.get(`products/sort?orderBy=${orderBy}&direction=${direction}`)

    return response.data
}