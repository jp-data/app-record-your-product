import { Card } from "antd";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

export function PopularCategoriesGraph({ result }) {
    const formattedData = result?.map((item) => ({
        products: item.Produto,
        result: item.soma,
        date: item.DATA
    })) || []


    return (
        <Card title="Produtos / + vendidos" className="col-span-3 w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedData}>
                    <XAxis
                        dataKey="products"
                        axisLine={false}
                        tickLine={false}
                        dy={16}
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