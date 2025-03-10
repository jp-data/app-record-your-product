import { Card } from "antd";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";
import { BestSellingData } from ".";

interface PopularCategoriesCardProps {
    result: BestSellingData[] | undefined
}

export function PopularCategoriesGraph({ result }: PopularCategoriesCardProps) {
    const formattedData = result?.map((item) => ({
        products: item.produto,
        result: parseFloat(item.soma),
        date: item.data
    })) || []

    const maxResult = Math.max(...formattedData.map((item) => item.result), 0)

    return (
        <Card title="Produtos / + vendidos" className="col-span-3 w-full border-violet-500">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedData} margin={{ top: 20, bottom: 5 }}>
                    <XAxis
                        dataKey="products"
                        axisLine={false}
                        tickLine={false}
                        dy={15}
                    />
                    <YAxis
                        stroke="#888"
                        axisLine={true}
                        tickLine={false}
                        tick={false}
                        width={80}
                        label={{
                            value: 'Nº Itens',
                            position: 'insideTop',
                            style: { dx: 10 }
                        }}
                        domain={[0, maxResult * 1.2]}
                    />
                    <Bar stroke={colors.violet['500']} strokeWidth={2} dataKey="result" >
                        <LabelList
                            dataKey="result"
                            position="top"
                            style={{ fill: colors.violet['500'], fontSize: 12 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}