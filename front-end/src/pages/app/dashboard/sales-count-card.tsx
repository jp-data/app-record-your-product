import { Card, Spin } from "antd";

export function SalesCountCard({ result, setIsLoadingData, isLoadingData }) {
    const sales = result?.[0]?.vendas
    if (sales) {
        setIsLoadingData(true)
        setTimeout(() => {
            setIsLoadingData(false)
        }, 1000)
    }
    return (
        <Card className="border-violet-500 cursor-pointer">
            <h1 className="text-lg font-bold text-slate-500 w-full">Qtd. de vendas</h1>
            {isLoadingData ? (
                <Spin size="large" className="ml-6" />
            ) : (
                <>
                    <p className="font-bold text-xl">{sales}</p>
                </>
            )}
        </Card>
    )
}