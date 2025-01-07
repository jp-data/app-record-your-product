import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import './global.css'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { Toaster } from "sonner"
import { AuthProvider } from "./pages/_auth/context/auth-context"


function App() {

  return (
    <main className="font-sans">
      <AuthProvider>
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </main>
  )
}

export default App
