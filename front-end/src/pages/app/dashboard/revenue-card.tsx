import { Card, Spin } from "antd";

export function RevenueCard({ result }) {
    const total = result?.[0]?.faturamento

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