import { Navigate } from "react-router-dom"
import { useAuth } from "./auth-context"
import { ReactNode } from "react"

interface PrivateRouteProps {
    children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to='/sign-in' />
    }

    return children
}