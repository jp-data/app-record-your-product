import { NewTaskButton } from "./new-task-button"
import { SearchProduct } from "./search-product"
import { TableProducts } from "./table-products"

export function Products() {
    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-semibold">Produtos</h1>
            <div className="flex items-center w-full max-w-lg">
                <NewTaskButton />
                <SearchProduct />
            </div>
            <div className="w-full">
                <TableProducts />
            </div>

        </div>

    )
}