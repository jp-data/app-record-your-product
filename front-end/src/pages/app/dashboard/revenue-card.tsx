import { Card } from "antd";
import { SalesData } from ".";

interface RevenueCardDataProps {
    result: SalesData[] | undefined
}

export function RevenueCard({ result }: RevenueCardDataProps) {
    const total = result?.[0]?.faturamento ?? 0
    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(total);
    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Faturamento</h1>
            <p className="font-bold text-xl">{formattedTotal}</p>
        </Card>
    )
}