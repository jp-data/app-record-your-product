import { ChartSpline, CircleDollarSign, ClipboardList, DatabaseZap } from "lucide-react";
import { NavLink } from "./nav-link";
import { Logout } from "../pages/_auth/logout";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex -h16 items-center gap-6 px-6">
                <DatabaseZap className="mr-2 h-6 w-6" />
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to='/products' className="flex items-center bg-slate-600">
                        <ClipboardList className="h-4 w-4 mr-1" />
                        Produtos
                    </NavLink>
                    <NavLink to='/sales' className="flex items-center">
                        <CircleDollarSign className="h-4 w-4 mr-1" />
                        Vendas
                    </NavLink>
                    <NavLink to='/dashboard' className="flex items-center">
                        <ChartSpline className="h-4 w-4 mr-1" />
                        Dashboard
                    </NavLink>
                    <Logout />
                </nav>
            </div>
        </div>
    );
}
