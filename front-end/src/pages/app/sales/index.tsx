import { NewSaleButton } from "./new-sale-button";
import { TableSales } from "./table-sales";

export function Sales() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
            <div className="flex items-center w-full max-w-lg h-3/4">
                <NewSaleButton />
                {/* Filtros */}
                {/* {Selecionar período} */}
            </div>
            <div className="w-full">
                <TableSales />
            </div>

        </div>
    )
}