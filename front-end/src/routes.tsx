import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Dashboard } from './pages/app/dashboard'
import { Products } from './pages/app/products'
import { Sales } from './pages/app/sales'
import { AuthLayout } from './pages/_layouts/auth'
import { SignIn } from './pages/_auth/sign-in'
import { SignUp } from './pages/_auth/sign-up'
import { PrivateRoute } from './pages/_auth/context/private-route'


export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <AppLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/sales',
                element: <Sales />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: < AuthLayout />,
        children: [
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> }
        ]
    }
])