import { Card } from "antd";
import { SalesData } from ".";

interface SalesCountCardDataProps {
    result: SalesData[] | undefined
}

export function SalesCountCard({ result }: SalesCountCardDataProps) {
    const sales = result?.[0]?.vendas ?? 0
    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Qtd. de vendas</h1>
            <p className="font-bold text-xl">{sales}</p>
        </Card>
    )
}