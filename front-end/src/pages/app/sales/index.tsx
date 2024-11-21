import { useEffect, useState } from "react";
import { NewSaleButton } from "./new-sale-button";
import { TableSales } from "./table-sales";
import { useQuery } from "@tanstack/react-query";
import { getTotalSales } from "../../../api-requisitions/get-total-sales";
import { DataType } from "../products/table-products";


export function Sales() {
    const [orders, setOrders] = useState<DataType[]>([])

    const { data: result } = useQuery({
        queryKey: ['orders'],
        queryFn: () => getTotalSales()
    })

    useEffect(() => {
        if (result) {
            setOrders(result)
        }
    }, [result])

    return (
        <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
            <div className="flex items-center w-full max-w-lg h-3/4">
                <NewSaleButton />
                {/* Filtros */}
                {/* {Selecionar período} */}
            </div>
            <div className="w-full">
                <TableSales result={result} />
            </div>

        </div>
    )
}