import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const login = (token: string) => {
        setIsAuthenticated(true)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

