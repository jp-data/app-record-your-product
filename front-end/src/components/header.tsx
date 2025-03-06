import { ChartSpline, CircleDollarSign, ClipboardList, DatabaseZap, Menu } from "lucide-react";
import { NavLink } from "./nav-link";
import { Logout } from "../pages/_auth/logout";
import { useState } from "react";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="border-b bg-white shadow-sm">
            <div className="flex h-12 items-center gap-6 px-6">
                <DatabaseZap className="mr-2 h-6 w-6" />
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                    <Menu className="h-6 w-6" />
                </button>
                <nav className="hidden md:flex items-center space-x-6">
                    <NavLink to='/products' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <ClipboardList className="h-4 w-4 mr-1" />
                        Produtos
                    </NavLink>
                    <NavLink to='/sales' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <CircleDollarSign className="h-4 w-4 mr-1" />
                        Vendas
                    </NavLink>
                    <NavLink to='/dashboard' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <ChartSpline className="h-4 w-4 mr-1" />
                        Dashboard
                    </NavLink>
                    <div className="hidden md:flex">
                        <Logout />
                    </div>
                </nav>
            </div>
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 p-4 border-t bg-white">
                    <NavLink to='/products' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <ClipboardList className="h-4 w-4 mr-1" />
                        Produtos
                    </NavLink>
                    <NavLink to='/sales' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <CircleDollarSign className="h-4 w-4 mr-1" />
                        Vendas
                    </NavLink>
                    <NavLink to='/dashboard' className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                        <ChartSpline className="h-4 w-4 mr-1" />
                        Dashboard
                    </NavLink>
                    <Logout />
                </div>
            )}
        </div>
    );
}
