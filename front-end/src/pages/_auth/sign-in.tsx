import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

export function SignIn() {
    const [searchParams] = useSearchParams()
    const { register } = useForm({
        defaultValues: { email: searchParams.get('email') ?? '' }
    })
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
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Seu email</label>
                            <input id='email' type='email' className="border rounded p-2" {...register('email')} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Sua senha</label>
                            <input id='password' type='password' className="border rounded p-2" />
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