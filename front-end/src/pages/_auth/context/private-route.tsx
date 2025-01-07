import { Navigate } from "react-router-dom"
import { useAuth } from "./auth-context"

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to='/sign-in' />
    }

    return children
}