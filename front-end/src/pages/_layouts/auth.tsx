import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 antialiased">
            <div className="hidden md:flex h-full border-r bg-slate-50 border-foreground/5 p-10 flex-col justify-between">
                <div className="flex items-center gap-3 text-lg  text-foreground">
                    <span className="font-semibold">register.app</span>
                </div>
                <footer className="text-sm">
                    Painel do parceiro &copy; register.app -  {new Date().getFullYear()}
                </footer>
            </div>
            <div className="relative flex flex-col items-center justify-center p-6 md:p-10">
                <Outlet />
            </div>
        </div>
    )
}