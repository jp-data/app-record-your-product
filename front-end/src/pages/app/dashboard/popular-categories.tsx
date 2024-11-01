import { Card } from "antd";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

const data = [
    { category: 'Chuteiras', sales: 97 },
    { category: 'Bolas', sales: 64 },
    { category: 'Tenis', sales: 48 },
    { category: 'Vestuário', sales: 35 },
];

export function PopularCategoriesGraph() {
    return (
        <Card title="Categorias / + vendidos" className="col-span-3">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.sort((a, b) => a.sales - b.sales)} style={{ fontSize: 12 }} margin={{ top: 10, right: 20, bottom: 5, left: 20 }}>
                    <XAxis
                        dataKey="category"
                        axisLine={false}
                        tickLine={false}
                        dy={16}
                    />

                    <YAxis
                        stroke="#888"
                        axisLine={true}
                        tickLine={false}
                        width={80}
                    />
                    <Bar stroke={colors.violet['500']} strokeWidth={2} dataKey="sales" >
                        <LabelList
                            dataKey="sales"
                            position="top"
                            style={{ fill: colors.violet['500'], fontSize: 12 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}