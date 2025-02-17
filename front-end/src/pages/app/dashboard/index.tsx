import { useEffect, useState } from "react";
import { DataSelector } from "./data-selector";
import { PopularCategoriesGraph } from "./popular-categories";
import { ResultGraph } from "./result-graph";
import { RevenueCard } from "./revenue-card";
import { SalesCountCard } from "./sales-count-card";
import { useQueries } from "@tanstack/react-query";
import { getSalesData } from "../../../api-requisitions/get-sales-data";
import { getBestProductsSelling } from "../../../api-requisitions/get-best-selling-products";
import { Spin } from "antd";
import { Flex } from "@radix-ui/themes";
import { getInvoicingEvolution } from "../../../api-requisitions/get-invoicing-evolution";

export interface SalesData {
    vendas: string
    faturamento: number | undefined
}

export interface BestSellingData {
    produto: string
    soma: string
    data: string
}

export interface InvoicingEvolutionData {
    dia: string
    faturamento: number
}

interface QueryResult<T> {
    data: T | undefined
    isError: boolean
    isLoading: boolean
}



export function Dashboard() {
    const [period, setPeriod] = useState<string>('3')
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
            },
            {
                queryKey: ['invoicing-evolution', { period }],
                queryFn: () => getInvoicingEvolution({ period }),
            }
        ]
    });

    const [salesResult, bestSellingResult, invoicingEvolutionResult] = results as [
        QueryResult<SalesData[]>,
        QueryResult<BestSellingData[]>,
        QueryResult<InvoicingEvolutionData[]>
    ]

    useEffect(() => {
        if (salesResult.data) {
            setIsLoadingData(true)
            setTimeout(() => {
                setIsLoadingData(false)
            }, 1500)

        }

    }, [salesResult.data, period]);

    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
            {isLoadingData ? (
                <div className='flex w-full items-center justify-center h-[400px]'>
                    <Flex align="center" gap="4">
                        <Spin size="large" />
                    </Flex>
                </div>
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
                        <ResultGraph result={invoicingEvolutionResult.data} />
                        <PopularCategoriesGraph result={bestSellingResult.data} />
                    </div>
                </>
            )}

        </div>
    )
}

