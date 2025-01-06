import { Link } from "react-router-dom";

export function SignUp() {
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
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor='Nome' className="text-sm font-semibold">Seu nome</label>
                            <input id='name' type='name' className="border rounded p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='email' className="text-sm font-semibold">Seu email</label>
                            <input id='email' type='email' className="border rounded p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='password' className="text-sm font-semibold">Senha</label>
                            <input id='password' type='password' className="border rounded p-2" />
                        </div>
                        <button className="w-full border text-white rounded p-2 bg-rose-600" type="submit">
                            Finalizar cadastro
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}