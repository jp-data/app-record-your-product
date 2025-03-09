import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";

export function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col antialiased">
            <Header />
            <div className="flex flex-1 flex-col gap-0 p-0 pt-0 md:gap-4 md:p-8 md:pt-6">
                <Outlet />
            </div>
        </div>
    )
}