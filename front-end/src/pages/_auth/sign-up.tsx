import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from "../../api-requisitions/create-user";
import { toast } from 'sonner'
import axios from 'axios'

const signUpForm = z.object({
    name: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("Email Inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres")
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm)
    })

    const { mutateAsync: registerUser } = useMutation({
        mutationFn: createUser
    })

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password
            })
            toast.success('Cadastro realizado com sucesso', {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`)
                }
            })
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message
                const errorType = error.response.data.error
                if (errorType === 'EmailAlreadyExistsException') {
                    toast.error('Email já cadastrado!')
                } else {
                    toast.error(errorMessage || 'Erro de formulário');
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
                    <Link to='/sign-in'>
                        Login
                    </Link>
                </button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className='text-2xl font-semibold tracking-tight'>Criar conta grátis</h1>
                        <p className='text-sm text-muted-foreground'>Utilize a plataforma que vai impulsionar suas vendas!</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="flex flex-col">
                            <label htmlFor='Nome' className="text-sm font-semibold">Seu nome</label>
                            <input id='name' type='name' className="border rounded p-2" {...register('name', {
                                required: "Campo obrigatório",
                            })} />
                            {errors.name && <span className="text-red-500 font-semibold text-sm">{errors.name.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Seu email</label>
                            <input id='email' type='email' className="border rounded p-2" {...register('email', {
                                required: 'Campo obrigatório',
                            })} />
                            {errors.email && <span className="text-red-500 font-semibold text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='password' className="text-sm font-semibold">Senha</label>
                            <input id='password' type='password' className="border rounded p-2" {...register('password', {
                                required: 'Campo obrigatório',
                                minLength: { value: 6, message: 'Mínimo: 6 caracteres' }
                            })} />
                            {errors.password && <span className="text-red-500 font-semibold text-sm">{errors.password.message}</span>}
                        </div>
                        <button disabled={isSubmitting} className="w-full border text-white rounded p-2 bg-rose-600" type="submit">
                            Finalizar cadastro
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}