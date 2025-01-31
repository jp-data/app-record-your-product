import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser } from "../../api-requisitions/login";
import { useAuth } from "./context/auth-context";
import axios from 'axios'
import { toast } from "sonner";

const signInForm = z.object({
    email: z.string().email(),
    password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>


export function SignIn() {
    const navigate = useNavigate()
    const { mutateAsync: authenticatedUser } = useMutation<{ access_token: string }, unknown, SignInForm>({
        mutationFn: loginUser
    })

    const { login } = useAuth()


    const [searchParams] = useSearchParams()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInForm),
        defaultValues: { email: searchParams.get('email') ?? '', password: '' }
    })

    async function handleSignIn(data: SignInForm) {
        try {
            const response = await authenticatedUser({
                email: data.email,
                password: data.password,
            })
            login(response.access_token)
            navigate('/products')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message
                const errorType = error.response.data.error

                if (errorType === 'InvalidCredentials') {
                    toast.error('Dados inválidos')
                } else {
                    toast.error(errorMessage || 'Erro de formulário')
                }
            } else {
                toast.error('Erro desconhecido')
            }
        }
    }

    return (
        <>
            <div className="p-8">
                <button className="absolute right-8 top-8">
                    <Link to='/sign-up'>
                        Novo cadastro
                    </Link>
                </button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Seu email</label>
                            <input id='email' type='email' className="border rounded p-2" {...register('email', {
                                required: 'Campo obrigatório'
                            })} />
                            {errors.email && <span className="text-red-500 font-semibold text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Sua senha</label>
                            <input id='password' type='password' className="border rounded p-2" {...register('password', {
                                required: 'Campo obrigatório'
                            })} />
                            {errors.password && <span className="text-red-500 font-semibold text-sm">{errors.password.message}</span>}
                        </div>
                        <button className="w-full border text-white rounded p-2 bg-rose-600 " type="submit">
                            Acessar painel
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}