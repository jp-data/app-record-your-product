import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, LabelList, CartesianGrid } from 'recharts';
import colors from 'tailwindcss/colors';

export function ResultGraph({ result }) {
    const formattedData = result?.map((item) => ({
        invoicing: item.faturamento,
        date: item.dia
    })) || []

    return (
        <Card title="Faturamento - evolução" className="col-span-6">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData} style={{ fontSize: 12 }} margin={{ top: 15, right: 20, bottom: 5, left: 20 }}>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        dy={16}
                        tickFormatter={(date) => {
                            const parsedDate = new Date(date)
                            const day = parsedDate.getDate().toString().padStart(2, '0')
                            const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
                            return `${day}/${month}`
                        }}
                        padding={{ left: 20, right: 10 }}
                    />

                    <YAxis
                        stroke="#888"
                        axisLine={true}
                        tickLine={false}
                        width={70}
                        tickFormatter={(value: number) =>
                            value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })
                        }
                        dx={-10}
                        domain={[0, (dataMax) => dataMax * 1.1]}
                    />
                    <Line
                        type="linear"
                        stroke={colors.violet['500']}
                        strokeWidth={2}
                        dataKey="invoicing"
                    >
                        <LabelList
                            dataKey="invoicing"
                            position="top"
                            offset={10}
                            style={{ fill: colors.violet['500'], fontSize: 12 }}
                        />
                    </Line>
                    <CartesianGrid vertical={false} className="stroke-muted" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
