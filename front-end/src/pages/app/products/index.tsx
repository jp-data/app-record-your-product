import { CirclePlus } from "lucide-react"
import { NewTaskButton } from "./new-task-button"
import { SearchProduct } from "./search-product"

export function Products() {
    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-semibold">Produtos</h1>
            <div className="flex items-center w-full max-w-lg">
                <NewTaskButton />
                <SearchProduct />
            </div>

        </div>

    )
}