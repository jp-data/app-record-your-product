import { useEffect, useState } from "react";
import { NewSaleButton } from "./new-sale-button";
import { TableSales } from "./table-sales";
import { useQuery } from "@tanstack/react-query";
import { getTotalSales } from "../../../api-requisitions/get-total-sales";
import { SalesFilter } from "./sales-filter";
import { DatePicker } from "./date-picker";
import { getSalesByPaymentChosenOrDiscount } from "../../../api-requisitions/get-sales-by-payment";

export interface DataType {
    id: number;
    date: string
    products: string;
    total: number;
    discount: number;
    subtotal: number;
    payment: string;
}

export function Sales() {
    const [orders, setOrders] = useState<DataType[]>([])
    const [paymentChosen, setPaymentChosen] = useState<string>('')
    const [hasDiscount, setHasDiscount] = useState<string>('')
    const [day, setDay] = useState<string>('0')
    const [isLoadingFilteredSales, setIsLoadingFilteredSales] = useState<boolean>(false)

    const { data: result } = useQuery({
        queryKey: ['orders', { paymentChosen: paymentChosen, hasDiscount: hasDiscount, day: day }],
        queryFn: () => {
            if (!paymentChosen && !hasDiscount && !day) {
                return getTotalSales()
            }
            return getSalesByPaymentChosenOrDiscount({ paymentChosen, hasDiscount, day })
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
                <div className="w-4/5 flex flex-wrap md:grid md:grid-cols-7 gap-4 items-center justify-between mt-6 ml-3">
                    <h1 className="text-2xl col-span-2 font-bold hidden md:block">Histórico</h1>
                    <SalesFilter
                        paymentChosen={paymentChosen}
                        hasDiscount={hasDiscount}
                        setPaymentChosen={setPaymentChosen}
                        setHasDiscount={setHasDiscount}
                        setIsLoadingFilteredSales={setIsLoadingFilteredSales}
                    />
                    <DatePicker
                        setDay={setDay}
                        setIsLoadingFilteredSales={setIsLoadingFilteredSales}
                    />
                </div>
            </div>
            <div className="w-full max-h-[500px] border rounded-lg shadow">
                <TableSales
                    orders={orders}
                    isLoadingFilteredSales={isLoadingFilteredSales}
                />
            </div>

        </div>
    )
}