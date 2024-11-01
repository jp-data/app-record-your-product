import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, LabelList, CartesianGrid } from 'recharts';
import colors from 'tailwindcss/colors';

const data = [
    { date: '10/10', revenue: 1080 },
    { date: '11/10', revenue: 1100 },
    { date: '12/10', revenue: 1400 },
    { date: '13/10', revenue: 1250 },
    { date: '14/10', revenue: 1545 },
    { date: '15/10', revenue: 2550 },
    { date: '16/10', revenue: 2145 },
];

export function ResultGraph() {
    return (
        <Card title="Faturamento - evolução" className="col-span-6">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} style={{ fontSize: 12 }} margin={{ top: 10, right: 20, bottom: 5, left: 20 }}>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        dy={16}
                    />

                    <YAxis
                        stroke="#888"
                        axisLine={false}
                        tickLine={false}
                        width={80}
                        tickFormatter={(value: number) =>
                            value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })
                        }
                        domain={[0, 4000]}
                        ticks={[0, 2000, 4000]}
                    />
                    <Line type="linear" stroke={colors.violet['500']} strokeWidth={2} dataKey="revenue">
                        <LabelList
                            dataKey="revenue"
                            position="top"
                            style={{ fill: colors.violet['500'], fontSize: 12 }}
                        />
                    </Line>
                    <CartesianGrid vertical={false} className="stroke-muted" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
