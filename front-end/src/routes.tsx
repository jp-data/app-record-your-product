import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Dashboard } from './pages/app/dashboard'
import { Products } from './pages/app/products'
import { Sales } from './pages/app/sales'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/sales', element: <Sales /> },
            { path: '/products', element: <Products /> },
            { path: '/dashboard', element: <Dashboard /> },
        ]
    },
    {
        // LOGIN E AUTH LAYOUT
    }
])