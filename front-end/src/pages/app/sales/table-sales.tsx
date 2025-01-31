import { Table, TableProps } from "antd";
import { Flex } from '@radix-ui/themes';
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { DataType } from ".";

interface DataProps {
    orders: DataType[]
    isLoadingFilteredSales: boolean
}

export function TableSales({ orders, isLoadingFilteredSales }: DataProps) {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Código(id_product)',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Itens',
            dataIndex: 'products',
            key: 'products',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
        {
            title: 'Desconto',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Valor total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Pagamento',
            dataIndex: 'payment',
            key: 'payment',
        },
    ];

    return (
        <>
            {isLoadingFilteredSales ? (
                <div className='flex items-center justify-center h-[400px]'>
                    <Flex align="center" gap="4">
                        <Spin size="large" />
                    </Flex>
                </div>
            )
                : (
                    <>
                        <Table<DataType>
                            columns={columns}
                            dataSource={orders?.map(item => ({
                                ...item,
                                key: item.id,
                                date: dayjs(item.date).format('DD/MM/YYYY')
                            }))}
                            className="font-semibold"
                        />
                    </>
                )
            }
        </>
    )
}