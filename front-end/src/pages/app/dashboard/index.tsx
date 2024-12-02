import { useEffect, useState } from "react";
import { DataSelector } from "./data-selector";
import { PopularCategoriesGraph } from "./popular-categories";
import { ResultGraph } from "./result-graph";
import { RevenueCard } from "./revenue-card";
import { SalesCountCard } from "./sales-count-card";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getSalesData } from "../../../api-requisitions/get-sales-data";
import { getBestProductsSelling } from "../../../api-requisitions/get-best-selling-products";
import { Spin } from "antd";



export function Dashboard() {
    const [period, setPeriod] = useState('3')
    const [totalSales, setTotalSales] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(false)

    const results = useQueries({
        queries: [
            {
                queryKey: ['orders', { period }],
                queryFn: () => getSalesData({ period }),
            },
            {
                queryKey: ['best-selling-products', { period }],
                queryFn: () => getBestProductsSelling({ period }),
            }
        ]
    });

    const [salesResult, bestSellingResult] = results;

    useEffect(() => {
        if (salesResult.data) {
            setIsLoadingData(true)
            setTimeout(() => {
                setTotalSales(salesResult.data)
                setIsLoadingData(false)
            }, 1000)

        }

    }, [salesResult.data, period]);

    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
            {isLoadingData ? (
                <Spin size="large" className="ml-6" />
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-4 w-1/2">
                        <RevenueCard
                            result={salesResult.data}
                        />
                        <SalesCountCard
                            result={salesResult.data}
                        />
                        <DataSelector setPeriod={setPeriod} period={period} />
                    </div>
                    <div className="grid grid-cols-9 gap-4 w-full">
                        <ResultGraph />
                        <PopularCategoriesGraph result={bestSellingResult.data} />
                    </div>
                </>
            )}

        </div>
    )
}

