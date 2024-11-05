import { Card } from "antd";

export function SalesCountCard() {
    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Qtd. de vendas</h1>
            <p className="font-bold text-xl">13</p>
        </Card>
    )
}