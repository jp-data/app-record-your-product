import { Card, Spin } from "antd";

export function SalesCountCard({ result }) {
    const sales = result?.[0]?.vendas

    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Qtd. de vendas</h1>

            <p className="font-bold text-xl">{sales}</p>


        </Card>
    )
}