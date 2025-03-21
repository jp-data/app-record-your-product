import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, LabelList, CartesianGrid } from 'recharts';
import colors from 'tailwindcss/colors';
import { InvoicingEvolutionData } from ".";

interface ResultGraphDataProps {
    result: InvoicingEvolutionData[] | undefined
}

export function ResultGraph({ result }: ResultGraphDataProps) {
    const formattedData = result?.map((item) => ({
        invoicing: item.faturamento,
        date: new Date(item.dia).toLocaleDateString('pt-BR')
    })) || []

    return (
        <Card title="Faturamento - evolução" className="col-span-6 border-violet-500">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData} style={{ fontSize: 12 }} margin={{ top: 15, right: 20, bottom: 5, left: 20 }}>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        dy={16}
                        tickFormatter={(date) => date}
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
                        domain={[0, (dataMax: number) => dataMax * 1.1]}
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
