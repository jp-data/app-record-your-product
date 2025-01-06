import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import './global.css'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { Toaster } from "sonner"


function App() {

  return (
    <main className="font-sans">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </main>
  )
}

export default App
