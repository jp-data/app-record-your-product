import { useEffect, useState } from "react";
import { DataSelector } from "./data-selector";
import { PopularCategoriesGraph } from "./popular-categories";
import { ResultGraph } from "./result-graph";
import { RevenueCard } from "./revenue-card";
import { SalesCountCard } from "./sales-count-card";
import { useQuery } from "@tanstack/react-query";
import { getSalesData } from "../../../api-requisitions/get-sales-data";

export function Dashboard() {
    const [totalSales, setTotalSales] = useState([])
    const [period, setPeriod] = useState('3')
    const [isLoadingData, setIsLoadingData] = useState(false)

    const { data: result } = useQuery({
        queryKey: ['orders', { period: period }],
        queryFn: () => {
            return getSalesData({ period })
        }
    })

    useEffect(() => {
        if (result) {
            setTotalSales(result)
        }
    }, [result])

    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
            <div className="grid grid-cols-3 gap-4 w-1/2">
                <RevenueCard
                    result={result}
                    setIsLoadingData={setIsLoadingData}
                    isLoadingData={isLoadingData}
                />
                <SalesCountCard
                    result={result}
                    setIsLoadingData={setIsLoadingData}
                    isLoadingData={isLoadingData}
                />
                <DataSelector setPeriod={setPeriod} />
            </div>
            <div className="grid grid-cols-9 gap-4 w-full">
                <ResultGraph />
                <PopularCategoriesGraph />
            </div>
        </div>
    )
}