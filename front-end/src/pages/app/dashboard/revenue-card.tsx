import { Card, Spin } from "antd";

export function RevenueCard({ result, setIsLoadingData, isLoadingData }) {
    const total = result?.[0]?.faturamento
    if (total) {
        setIsLoadingData(true)
        setTimeout(() => {
            setIsLoadingData(false)
        }, 1000)
    }
    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(total);

    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Faturamento</h1>
            {isLoadingData ? (
                <Spin size="large" className="ml-6" />
            ) : (
                <>
                    <p className="font-bold text-xl">{formattedTotal}</p>
                </>
            )}
        </Card>
    )
}