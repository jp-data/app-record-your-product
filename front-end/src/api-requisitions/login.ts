import { api } from "../lib/axios";

interface loginForm {
    email: string
    password: string
}

export async function loginUser({ email, password }: loginForm) {
    const response = await api.post('/auth/login', { email, password })
    const { access_token } = response.data
    localStorage.setItem('access_token', access_token)
    return response.data
}