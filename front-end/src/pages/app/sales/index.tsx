import { useEffect, useState } from "react";
import { NewSaleButton } from "./new-sale-button";
import { TableSales } from "./table-sales";
import { useQuery } from "@tanstack/react-query";
import { getTotalSales } from "../../../api-requisitions/get-total-sales";
import { DataType } from "../products/table-products";
import { SalesFilter } from "./sales-filter";
import { DatePicker } from "./date-picker";
import { getSalesByPaymentChosenOrDiscount } from "../../../api-requisitions/get-sales-by-payment";


export function Sales() {
    const [orders, setOrders] = useState<DataType[]>([])
    const [paymentChosen, setPaymentChosen] = useState('')
    const [hasDiscount, setHasDiscount] = useState('')

    const { data: result } = useQuery({
        queryKey: ['orders', { paymentChosen: paymentChosen, hasDiscount: hasDiscount }],
        queryFn: () => {
            if (!paymentChosen && !hasDiscount) {
                return getTotalSales()
            }
            return getSalesByPaymentChosenOrDiscount({ paymentChosen, hasDiscount })
        }
    })

    useEffect(() => {
        if (result) {
            setOrders(result)
        }
    }, [result])

    return (
        <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl ml-1 font-bold tracking-tight">Vendas</h1>
            <div className="flex flex-col w-full max-w-lg h-3/4">
                <NewSaleButton />
                <div className="w-4/5 grid grid-cols-7 items-center justify-between mt-6 ml-3">
                    <h1 className="text-2xl col-span-2 font-bold">Histórico</h1>
                    <SalesFilter setPaymentChosen={setPaymentChosen} setHasDiscount={setHasDiscount} />
                    <DatePicker />
                </div>
                {/* Filtros */}
                {/* {Selecionar período} */}
            </div>
            <div className="w-full">
                <TableSales result={result} />
            </div>

        </div>
    )
}