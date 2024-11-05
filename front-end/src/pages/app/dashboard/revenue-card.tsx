import { Card } from "antd";

export function RevenueCard() {
    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Faturamento</h1>
            <p className="font-bold text-xl">R$ 1.500</p>
        </Card>
    )
}